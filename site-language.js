/* Shared language preference and safe UI text translation. No external services. */
(function(){
'use strict';
const KEY='dogovor.language';
const langs=['kz','ru','en'];
const pairs=[
['О специалисте','Маман туралы','About'],['Портфолио','Портфолио','Portfolio'],['Прайс и расчёт','Бағалар және есептеу','Prices & estimate'],['Отправить ТЗ','Техникалық тапсырманы жіберу','Send brief'],['Отзывы','Пікірлер','Reviews'],['Договор онлайн','Онлайн шарт','Online contract'],['Оформить договор онлайн','Онлайн шарт жасасу','Create online contract'],['Электромонтаж','Электр монтаждау','Electrical installation'],['Видеонаблюдение','Бейнебақылау','CCTV'],['Интернет и сети','Интернет және желілер','Internet & networks'],['Компьютеры и IT','Компьютерлер және IT','Computers & IT'],['Услуга','Қызмет','Service'],['Цена','Бағасы','Price'],['Количество','Саны','Quantity'],['Итого','Барлығы','Total'],['Итого:','Барлығы:','Total:'],['Рассчитать','Есептеу','Calculate'],['Отправить','Жіберу','Send'],['Отмена','Болдырмау','Cancel'],['Сохранить','Сақтау','Save'],['Удалить','Жою','Delete'],['Добавить','Қосу','Add'],['Обновить','Жаңарту','Refresh'],['Загрузить','Жүктеу','Load'],['Проверить','Тексеру','Check'],['Имя','Аты','Name'],['ФИО','Аты-жөні','Full name'],['Телефон','Телефон','Phone'],['E-mail','E-mail','E-mail'],['Email','Email','Email'],['Адрес','Мекенжай','Address'],['Описание','Сипаттама','Description'],['Комментарий','Пікір','Comment'],['Дата','Күні','Date'],['Статус','Мәртебесі','Status'],['Действия','Әрекеттер','Actions'],['Фото','Фото','Photo'],['Файл','Файл','File'],['Панель Исполнителя','Орындаушы панелі','Contractor dashboard'],['Вход по логину и паролю, заданным в Script Properties Apps Script.','Apps Script Script Properties бөлімінде орнатылған логин мен құпиясөз арқылы кіру.','Sign in with the username and password configured in Apps Script Properties.'],['Логин','Логин','Username'],['Пароль','Құпиясөз','Password'],['Войти','Кіру','Sign in'],['Выйти','Шығу','Sign out'],['Договоры','Шарттар','Contracts'],['Создать договор','Шарт жасау','Create contract'],['Заявки','Өтінімдер','Requests'],['На модерации','Тексерілуде','Pending review'],['Одобрен','Мақұлданды','Approved'],['Отклонён','Қабылданбады','Rejected'],['Черновик','Жоба','Draft'],['Подписан','Қол қойылды','Signed'],['На подписи','Қол қоюда','Awaiting signature'],['Подписать','Қол қою','Sign'],['Отклонить','Қабылдамау','Reject'],['Скачать PDF','PDF жүктеу','Download PDF'],['Установить приложение','Қолданбаны орнату','Install app'],['Номер договора','Шарт нөмірі','Contract number'],['Заказчик','Тапсырыс беруші','Client'],['Исполнитель','Орындаушы','Contractor'],['Сумма','Сома','Amount'],['Стоимость','Құны','Cost'],['Прайс-лист','Бағалар тізімі','Price list'],['Оставить отзыв','Пікір қалдыру','Leave a review'],['Ваше имя','Сіздің атыңыз','Your name'],['Ваш телефон','Сіздің телефоныңыз','Your phone'],['Отправить отзыв','Пікір жіберу','Submit review'],['Установка розетки/выключателя','Розетка/ажыратқыш орнату','Install socket/switch'],['Монтаж электрощита (до 12 модулей)','Электр қалқанын орнату (12 модульге дейін)','Install electrical panel (up to 12 modules)'],['Прокладка кабеля скрытая','Кабельді жасырын төсеу','Concealed cable installation'],['Монтаж светильника/люстры','Шам/люстра орнату','Install light fixture'],['Установка камеры видеонаблюдения','Бейнебақылау камерасын орнату','Install CCTV camera'],['Настройка видеорегистратора','Бейнетіркегішті баптау','Configure video recorder'],['Настройка удалённого просмотра с телефона','Телефоннан қашықтан қарауды баптау','Configure remote mobile viewing'],['Настройка Wi-Fi роутера','Wi-Fi роутерді баптау','Configure Wi-Fi router'],['Прокладка сетевого кабеля','Желілік кабель төсеу','Install network cable'],['Обжим и тестирование сети','Желіні ұштау және тексеру','Terminate and test network'],['Диагностика компьютера/ноутбука','Компьютер/ноутбук диагностикасы','Computer/laptop diagnostics'],['Переустановка ОС и программ','ОЖ және бағдарламаларды қайта орнату','Reinstall OS and software'],['Чистка от пыли + замена термопасты','Шаңнан тазалау және термопастаны ауыстыру','Dust cleaning and thermal paste replacement'],['Разработка простого сайта-визитки','Қарапайым визитка сайт жасау','Build a simple business website'],['шт.','дана','pcs'],['услуга','қызмет','service'],['компл.','жиынтық','set'],['п.м','қ.м','linear m'],['точка','нүкте','point'],['проект','жоба','project']
];
pairs.push(
['Мастер | Электрика · Видео · IT','Шебер | Электр · Бейне · IT','Specialist | Electrical · Video · IT'],
['Электрика,','Электр жұмыстары,','Electrical work,'],
['видеонаблюдение','бейнебақылау','CCTV'],
['и IT под ключ — быстро, честно, с договором онлайн','және IT — жедел, ашық, онлайн шартпен','and IT turnkey — fast, transparent, with an online contract'],
['Электромонтаж и щиты, установка камер видеонаблюдения, настройка интернета и Wi-Fi, ремонт компьютеров и ноутбуков, программирование и сайты. Работаю в Алматы и области — с прозрачным расчётом стоимости и онлайн-договором на каждую работу.','Электр желілері мен қалқандар, бейнебақылау камераларын орнату, интернет пен Wi-Fi баптау, компьютерлерді жөндеу, бағдарламалау және сайттар. Алматы мен облыста жұмыс істеймін — бағасы алдын ала есептеледі, әр жұмысқа онлайн шарт жасалады.','Electrical installations and panels, CCTV, internet and Wi-Fi setup, computer and laptop repair, programming and websites. Working across Almaty and the region with transparent estimates and an online contract for every job.'],
['Рассчитать стоимость','Құнын есептеу','Estimate cost'],
['Написать в WhatsApp','WhatsApp-қа жазу','Message on WhatsApp'],
['Отправить ТЗ / схему','Тапсырма / сызбаны жіберу','Send brief / drawing'],
['направлений работы','қызмет бағыты','areas of expertise'],
['онлайн-договор и чек','онлайн шарт және түбіртек','online contract and receipt'],
['обычно отвечаю в WhatsApp','әдетте WhatsApp-та жауап беремін','usual WhatsApp response time'],
['Что я делаю','Менің қызметтерім','What I do'],
['Одна команда — шесть направлений. Не нужно искать разных подрядчиков под каждую задачу.','Бір маман — алты бағыт. Әр жұмысқа бөлек орындаушы іздеудің қажеті жоқ.','One specialist, six fields. No need to find a different contractor for every task.'],
['Компьютеры и ноутбуки','Компьютерлер мен ноутбуктер','Computers and laptops'],
['Диагностика, чистка от пыли, замена комплектующих, установка ОС и программ, ускорение работы системы.','Диагностика, шаңнан тазалау, бөлшектерді ауыстыру, операциялық жүйе мен бағдарламаларды орнату, жүйені жылдамдату.','Diagnostics, cleaning, component replacement, OS and software installation, performance tuning.'],
['Программирование','Бағдарламалау','Programming'],
['Автоматизация рутинных задач, скрипты, боты и небольшие программы под конкретную задачу бизнеса.','Күнделікті міндеттерді автоматтандыру, скрипттер, боттар және бизнеске арналған шағын бағдарламалар.','Automation of routine tasks, scripts, bots and small custom business applications.'],
['Подбор и монтаж камер, настройка видеорегистратора, удалённый просмотр с телефона из любой точки.','Камераларды таңдау және орнату, бейнетіркегішті баптау, телефоннан қашықтан көру.','Camera selection and installation, recorder setup and remote viewing from your phone.'],
['Прокладка кабеля, настройка роутеров и Wi-Fi, усиление сигнала, объединение сети на несколько этажей.','Кабель тарту, роутер мен Wi-Fi баптау, сигналды күшейту және көп қабатты желілерді біріктіру.','Cable routing, router and Wi-Fi setup, signal improvement and multi-floor networking.'],
['Электрощиты, розетки и освещение, диагностика и ремонт проводки, монтаж «с нуля» и по готовому проекту.','Электр қалқандары, розеткалар мен жарықтандыру, сымдарды тексеру және жөндеу, толық немесе дайын жоба бойынша монтаж.','Electrical panels, sockets and lighting, wiring diagnostics and repair, installations from scratch or from plans.'],
['Сайты','Сайттар','Websites'],
['Создание и настройка сайтов и лендингов, интеграция форм заявок и оплаты под задачи бизнеса.','Сайттар мен лендингтер жасау, тапсырыс және төлем нысандарын біріктіру.','Website and landing page development, enquiry and payment form integration.'],
['Примеры выполненных работ','Орындалған жұмыстар','Completed projects'],
['Фото реальных объектов — обновляется по мере выполнения новых заказов.','Нақты нысандардың суреттері — жаңа тапсырыстар орындалған сайын жаңартылады.','Photos from real projects, updated as new jobs are completed.'],
['Стоимость работ и расчёт онлайн','Жұмыс бағасы және онлайн есептеу','Service prices and online estimates'],
['Цены ориентировочные — точная стоимость зависит от объёма и уточняется после осмотра объекта или по фото/схеме.','Бағалар болжамды. Нақты құны жұмыс көлеміне және нысанды қарауға немесе фото/сызбаға байланысты.','Prices are indicative; the final amount depends on scope and is confirmed after an inspection or reviewing photos/plans.'],
['Цены указаны без учёта материалов, если не отмечено иное. Итоговая стоимость фиксируется в договоре до начала работ.','Басқаша көрсетілмесе, бағаларға материалдар кірмейді. Қорытынды құн жұмыс басталғанға дейін шартта бекітіледі.','Prices exclude materials unless stated otherwise. The final price is recorded in the contract before work starts.'],
['Калькулятор стоимости','Баға калькуляторы','Cost calculator'],
['Кол-во','Саны','Qty'],
['Выберите услугу и добавьте в расчёт — стоимость посчитается автоматически.','Қызметті таңдап, есептеуге қосыңыз — құны автоматты түрде есептеледі.','Choose a service and add it to the estimate; the price is calculated automatically.'],
['Отправить расчёт в WhatsApp','Есепті WhatsApp арқылы жіберу','Send estimate via WhatsApp'],
['Оформить договор','Шарт жасасу','Create contract'],
['Заявка','Өтінім','Enquiry'],
['Отправить ТЗ или схему проекта','Техникалық тапсырма немесе жоба сызбасын жіберу','Send a project brief or drawing'],
['Опишите задачу и приложите файл (схему, план, фото объекта, ТЗ) — сообщение с вашими контактами и файлом придёт мне напрямую.','Тапсырманы сипаттап, файлды (сызба, жоспар, фото, техникалық тапсырма) тіркеңіз — байланыс деректеріңіз бен файл маған тікелей келеді.','Describe the task and attach a drawing, plan, photo or brief; your enquiry will be sent directly to me.'],
['Номер WhatsApp','WhatsApp нөмірі','WhatsApp number'],
['Опишите задачу','Тапсырманы сипаттаңыз','Describe the task'],
['Файл: ТЗ, схема или фото объекта (необязательно)','Файл: тапсырма, сызба немесе фото (міндетті емес)','File: brief, drawing or site photo (optional)'],
['Нажмите, чтобы выбрать файл (PDF, изображение)','Файлды таңдау (PDF, сурет)','Choose file (PDF or image)'],
['Отправить заявку','Өтінім жіберу','Submit enquiry'],
['Отправить через WhatsApp','WhatsApp арқылы жіберу','Send via WhatsApp'],
['При отправке через WhatsApp сообщение с текстом откроется автоматически — файл нужно будет прикрепить в открывшемся чате вручную (браузер не может сделать это за вас).','WhatsApp-та дайын хабарлама ашылады. Файлды чатқа қолмен тіркеу қажет (браузер оны автоматты тіркей алмайды).','WhatsApp opens with a prepared message. Attach the file manually in the chat; the browser cannot attach it for you.'],
['Как это работает','Қалай жұмыс істейді','How it works'],
['1. Заполняете форму или пишете в WhatsApp','1. Нысанды толтырасыз немесе WhatsApp-та жазасыз','1. Fill out the form or send a WhatsApp message'],
['2. Я получаю заявку с вашими контактами и файлом','2. Мен байланыс деректеріңіз бен файлды аламын','2. I receive your contact details and file'],
['3. Отвечаю с уточнениями и предварительной стоимостью','3. Нақтылау сұрақтарымен және болжамды бағамен жауап беремін','3. I reply with questions and an initial estimate'],
['4. Согласовываем детали и оформляем онлайн-договор','4. Мәліметтерді келісіп, онлайн шарт жасасамыз','4. We agree on the details and create an online contract'],
['Все данные передаются напрямую мне и не публикуются на сайте.','Барлық деректер маған тікелей жіберіледі және сайтта жарияланбайды.','Your information is sent directly to me and is not published on the website.'],
['Что говорят клиенты','Клиенттердің пікірлері','What clients say'],
['Реальные отзывы после публикации проходят проверку и появляются здесь для всех посетителей.','Клиенттердің пікірлері тексерілгеннен кейін барлық келушілерге көрсетіледі.','Client reviews appear here after moderation.'],
['Отзывов пока нет — будьте первым, кто оставит отзыв!','Әзірге пікір жоқ — бірінші болып пікір қалдырыңыз!','No reviews yet — be the first!'],
['Оценка','Баға','Rating'],
['Текст отзыва','Пікір мәтіні','Review text'],
['· г. Алматы','· Алматы қ.','· Almaty'],
['Как к вам обращаться','Сізге қалай жүгінеміз','How should I address you?'],
['Что нужно сделать, адрес объекта, сроки...','Не істеу керек, нысан мекенжайы, мерзімі...','Describe the task, site address and timeline...'],
['Как подписать отзыв','Пікір авторының аты','Name to show with your review'],
['Как прошла работа, что понравилось...','Жұмыс қалай өтті, не ұнады...','How did it go? What did you like?'],
['Электромонтаж и электрощиты','Электр монтаждау және қалқандар','Electrical work and panels'],
['Монтаж видеонаблюдения','Бейнебақылау орнату','CCTV installation'],
['Настройка сетей и интернета','Желілер мен интернетті баптау','Network and internet setup'],
['Ремонт и настройка компьютеров','Компьютерлерді жөндеу және баптау','Computer repair and setup'],
['Сайты и автоматизация','Сайттар және автоматтандыру','Websites and automation'],
['Ваша будущая работа здесь','Сіздің жобаңыз осында болуы мүмкін','Your project could be here'],
['Фото появится после первой загрузки','Сурет алғашқы жүктеуден кейін пайда болады','Photo will appear after the first upload'],
['Примеры работ будут опубликованы здесь.','Жұмыс мысалдары осында жарияланады.','Project examples will appear here.'],
['Электромонтаж и видеонаблюдение','Электр монтаждау және бейнебақылау','Electrical installation and CCTV']
);

pairs.push(
['Укажите имя','Атыңызды жазыңыз','Please enter your name'],
['Укажите номер WhatsApp','WhatsApp нөмірін жазыңыз','Please enter your WhatsApp number'],
['Опишите задачу или приложите файл','Тапсырманы сипаттаңыз немесе файл тіркеңіз','Describe the task or attach a file'],
['Отправка ещё не настроена на сайте (CONFIG.WEB_APP_URL) — воспользуйтесь кнопкой WhatsApp','Сайт жіберу функциясы баптанбаған — WhatsApp батырмасын пайдаланыңыз','Sending is not yet configured — please use the WhatsApp button'],
['Приём отзывов ещё не настроен на сайте (CONFIG.WEB_APP_URL)','Сайтта пікір қабылдау баптанбаған','Review submission is not yet configured'],
['Поставьте оценку','Баға беріңіз','Please give a rating'],
['Напишите текст отзыва','Пікіріңізді жазыңыз','Please write your review'],
['✅ Заявка отправлена! Я свяжусь с вами в WhatsApp в ближайшее время.','✅ Өтінім жіберілді! Жақын арада WhatsApp-та хабарласамын.','✅ Enquiry sent! I will contact you on WhatsApp shortly.'],
['✅ Спасибо! Отзыв отправлен на модерацию и появится на сайте после проверки.','✅ Рахмет! Пікіріңіз тексеруге жіберілді, тексерілгеннен кейін пайда болады.','✅ Thank you! Your review has been submitted and will appear after moderation.'],
['Не удалось отправить заявку','Өтінімді жіберу сәтсіз болды','Failed to send the enquiry'],
['Не удалось отправить отзыв','Пікірді жіберу сәтсіз болды','Failed to send the review'],
['Ошибка сети:','Желі қатесі:','Network error:'],
['Задача:','Тапсырма:','Task:'],
['Сәлеметсіз бе!','Сәлеметсіз бе!','Hello!'],
['Хочу отправить ТЗ/схему проекта.','Тапсырма/сызбаны жіберемін.','I would like to send a project brief.'],
['(Файл прикреплю здесь, в чате)','(Файлды чатта қолмен тіркеймін)','(I will attach the file in the chat)'],
['Фото недоступно','Фото қолжетімсіз','Photo unavailable'],
['Мои договора','Менің шарттарым','My contracts'],
['Мои договора 📋','Менің шарттарым 📋','My contracts 📋'],
['Договоров пока нет','Әзірге шарттар жоқ','No contracts yet'],
['Проверить статус','Мәртебені тексеру','Check status'],
['Написать Исполнителю в WhatsApp','Орындаушыға WhatsApp арқылы жазу','Message the Contractor on WhatsApp'],
['Очистить историю','Тарихты тазалау','Clear history'],
['Удалить всю историю договоров на этом устройстве?','Осы құрылғыдағы барлық шарттар тарихын жоюға келісесіз бе?','Delete all contract history on this device?'],
['На подписи','Қол қоюда','Awaiting signature']
);
const dict={kz:new Map(),en:new Map()};pairs.forEach(([ru,kz,en])=>{dict.kz.set(ru,kz);dict.en.set(ru,en)});
function get(){try{let l=localStorage.getItem(KEY);return langs.includes(l)?l:'ru'}catch(e){return 'ru'}}
function save(l){if(!langs.includes(l))return;try{localStorage.setItem(KEY,l)}catch(e){}document.documentElement.lang=l==='kz'?'kk':l;updateButtons(l);window.dispatchEvent(new CustomEvent('site-language-change',{detail:{lang:l}}))}
function updateButtons(l){document.querySelectorAll('[data-site-lang]').forEach(b=>{let on=b.dataset.siteLang===l;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on))})}
function t(s,l=get()){return translate(String(s),l).trim()}
function translate(s,l){if(l==='ru')return s;let m=s.match(/^(\s*)(.*?)(\s*)$/s);return m[1]+(dict[l].get(m[2])||m[2])+m[3]}
function apply(root=document){const l=get();document.documentElement.lang=l==='kz'?'kk':l;updateButtons(l);if(root.nodeType===1&&root.closest('[data-no-translate],script,style,svg'))return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return n.parentElement&&!n.parentElement.closest('script,style,svg,textarea,[data-no-translate],.site-lang-switch')&&n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});let n;while(n=walker.nextNode()){if(n.__siteOriginal===undefined || (n.__siteOutput!==undefined && n.nodeValue!==n.__siteOutput))n.__siteOriginal=n.nodeValue;let v=translate(n.__siteOriginal,l);n.__siteOutput=v;if(n.nodeValue!==v)n.nodeValue=v}if(root.querySelectorAll){root.querySelectorAll('input[placeholder],textarea[placeholder],img[alt]').forEach(el=>{for(const a of ['placeholder','alt'])if(el.hasAttribute(a)){let k='siteOriginal'+a;if(el.dataset[k]===undefined)el.dataset[k]=el.getAttribute(a);el.setAttribute(a,translate(el.dataset[k],l))}})}}
function change(l){save(l);apply();if(typeof window.setLang==='function'&&window.setLang!==change)window.setLang(l)}
function mount(){if(!document.querySelector('.site-lang-switch,.site-has-lang')){let bar=document.createElement('div');bar.className='site-lang-switch';bar.setAttribute('aria-label','Language / Тіл / Язык');bar.innerHTML='<button type="button" data-site-lang="kz">ҚАЗ</button><button type="button" data-site-lang="ru">РУС</button><button type="button" data-site-lang="en">ENG</button>';let target=document.querySelector('.navcta')||document.querySelector('.pwaBar')||document.body;target.prepend(bar);bar.addEventListener('click',e=>{let b=e.target.closest('[data-site-lang]');if(b)change(b.dataset.siteLang)})}apply();let queued=false;new MutationObserver(records=>{if(queued)return;if(!records.some(r=>r.addedNodes.length||r.type==='characterData'))return;queued=true;queueMicrotask(()=>{queued=false;apply()})}).observe(document.body,{subtree:true,childList:true,characterData:true})}
window.SiteLanguage={get,save,apply,change,t};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();window.addEventListener('storage',e=>{if(e.key===KEY)apply()});
})();
