/*
  service-worker.js — общий Service Worker для обеих статических страниц
  (ТЗ раздел 5, Этап 4).

  Разместить строго в /dogovor/service-worker.js (в корне, рядом с
  index.html — бывший contract.html). Тогда его максимально возможный
  scope — "/dogovor/", чего достаточно и для корневой страницы, и для
  вложенной "/dogovor/admin/" (scope — это префикс пути, вложенные
  папки в него входят). Обе страницы регистрируют ЭТОТ ЖЕ файл (см.
  комментарий "PWA: SERVICE WORKER" в index.html и admin/index.html),
  просто admin/index.html явно сужает себе scope до "./" при регистрации,
  чтобы не мешать корневой странице и наоборот.

  Что делает:
  - кэширует статику (HTML, manifest.json, иконки) обеих страниц при
    установке — быстрая повторная загрузка и офлайн-просмотр формы;
  - HTML-страницы — стратегия "network-first, then cache" (чтобы люди
    сразу видели свежую версию, когда есть интернет, но приложение всё
    равно открывалось офлайн);
  - иконки/manifest — "cache-first" (они не меняются между релизами);
  - НЕ трогает запросы к бэкенду Apps Script Web App и сторонним API
    (ipify и т.п.) — они идут напрямую в сеть, как обычно; если сети
    нет — fetch там просто упадёт с ошибкой, а это уже обрабатывает
    существующий код страниц (см. submitToServer/apiPost — try/catch
    + понятное сообщение и, для клиентской формы, очередь на
    автоповтор при восстановлении сети, реализовано в самой странице,
    без Background Sync API — он ненадёжно/не везде поддерживается,
    в т.ч. отсутствует в Safari/iOS, см. п.5.3 ТЗ "по возможности...
    либо просто понятное сообщение").
*/

const SW_VERSION = 'v3-contract-language-sharing';
const CACHE_NAME = `dogovor-static-${SW_VERSION}`;

/* Пути — относительно расположения этого файла, т.е. от "/dogovor/" */
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './home.html',
  './contract.html',
  './site-language.js',
  './contract-preview.js',
  './site-mobile.css',
  './icons/icon-client-any-192.png',
  './icons/icon-client-any-512.png',
  './icons/icon-client-maskable-192.png',
  './icons/icon-client-maskable-512.png',
  './icons/icon-client-apple-touch-180.png',
  './icons/icon-client-32.png',

  './admin/',
  './admin/index.html',
  './admin/manifest.json',
  './icons/icon-admin-any-192.png',
  './icons/icon-admin-any-512.png',
  './icons/icon-admin-maskable-192.png',
  './icons/icon-admin-maskable-512.png',
  './icons/icon-admin-apple-touch-180.png',
  './icons/icon-admin-32.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      /* addAll() отменяет весь install, если хоть один файл не найден —
         кладём файлы по одному через allSettled, чтобы отсутствие,
         например, admin/ (если разворачивают только клиентскую часть)
         не ломало кэш остальных файлов. */
      Promise.allSettled(PRECACHE_URLS.map(url => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(name => name.startsWith('dogovor-static-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

function isPrecachedAsset(pathname) {
  return /\/(manifest\.json|icons\/icon-[\w.-]+\.png)$/.test(pathname);
}

self.addEventListener('fetch', event => {
  const req = event.request;

  /* Только GET; POST к Apps Script (отправка договора, вход в admin,
     подписание и т.д.) не перехватываем вообще. */
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* Чужой источник (Apps Script Web App, api.ipify.org, геолокация и
     т.п.) — не трогаем, пусть идёт в сеть напрямую как обычно. */
  if (url.origin !== self.location.origin) return;

  /* Переход по странице (открытие /dogovor/ или /dogovor/admin/) —
     network-first, чтобы при наличии сети всегда открывалась свежая
     версия, а при её отсутствии — последняя закэшированная. */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          /* нет ни сети, ни этой конкретной страницы в кэше — отдаём
             ближайший app-shell по разделу пути */
          const fallback = url.pathname.includes('/admin')
            ? await caches.match('./admin/index.html')
            : await caches.match('./index.html');
          if (fallback) return fallback;
          return new Response(
            '<!doctype html><meta charset="utf-8"><body style="font-family:sans-serif;background:#14171c;color:#eef1f5;padding:40px;text-align:center">Нет соединения с интернетом, и эта страница ещё не открывалась на этом устройстве.</body>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  /* Статика приложения (manifest.json, иконки) — cache-first: не
     меняется между релизами, важна скорость и офлайн-доступность. */
  if (isPrecachedAsset(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        return res;
      }))
    );
    return;
  }

  /* Всё остальное same-origin — обычная сеть без вмешательства. */
});
