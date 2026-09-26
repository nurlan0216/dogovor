/* Short on-screen preview in the chosen language. The full PDF is assembled on the server. */
function localizeContractPreview(lang){
  if(!['kz','en'].includes(lang))return;
  const kk=lang==='kz',E=xe,V=id=>E(G(id)?.value||'—'),v=id=>G(id)?.value||'';
  const words=kk?{
    title:'АҚЫЛЫ ҚЫЗМЕТ КӨРСЕТУ ШАРТЫ',subtitle:'электр монтаждау және/немесе бейнебақылау орнату',city:'Алматы қ.',date:'Күні',
    contractor:'Орындаушы',client:'Тапсырыс беруші',titlePart:'ШАРТТЫҢ МӘНІ',types:'Жұмыс түрлері',task:'Техникалық тапсырма',location:'Мекенжай',
    materials:'МАТЕРИАЛДАР',supplied:'Материалдар мен жабдықтарды сатып алатын тарап',spec:'ЕРЕКШЕЛІК',
    name:'Атауы',unit:'Өлш.',qty:'Саны',price:'Бағасы',sum:'Сомасы',specTotal:'Ерекшелік бойынша барлығы',
    cost:'ҚҰНЫ ЖӘНЕ ТӨЛЕМ',costTotal:'Жалпы құны',advance:'Алдын ала төлем',balance:'Қалдық',payment:'Төлем тәртібі',
    timelines:'МЕРЗІМДЕР',begin:'Басталуы',end:'Аяқталуы',parties:'ТАРАПТАРДЫҢ МІНДЕТТЕРІ',accept:'ҚАБЫЛДАУ ЖӘНЕ КЕПІЛДІК',
    warranty:'Кепілдік мерзімі',months:'ай',liability:'ЖАУАПКЕРШІЛІК',digital:'ЭЛЕКТРОНДЫҚ ҚОЛ ҚОЮ',privacy:'ДЕРБЕС ДЕРЕКТЕР',
    details:'ДЕРЕКТЕМЕЛЕР ЖӘНЕ ҚОЛДАР',fio:'Аты-жөні',iin:'ЖСН/БСН',phone:'Телефон',sign:'Қолы',
    idDoc:'Жеке куәлік',issuedBy:'Кім берген',issuedOn:'Берілген күні',
    draft:'Бұл — алдын ала қысқаша көрсетілім. Толық қазақша шарт Google Drive-та PDF түрінде жасалады.',
    intro:'Орындаушы көрсетілген қызметтерді орындауға, ал Тапсырыс беруші нәтижесін қабылдауға және төлеуге міндеттенеді.',
    duties:'Орындаушы жұмысты сапалы әрі келісілген мерзімде орындайды, қауіпсіздік талаптарын сақтайды және өзгерістер туралы хабарлайды. Тапсырыс беруші объектіге кіруді қамтамасыз етеді, жұмысты қабылдайды және төлейді.',
    acceptance:'Нәтиже акт бойынша қабылданады. Ескертулер актіге жазылады. Кепілдік келісілген мерзім бойы қолданылады.',
    responsibility:'Тараптар Қазақстан Республикасының заңнамасына және толық шартқа сәйкес жауап береді.',
    signNote:'Экрандағы қол мен келісім тіркеледі. Орындаушы шартты растағаннан кейін қол қойылған PDF жасалады.',
    dataNote:'Дербес деректер шартты орындауға қажетті көлемде заңға сәйкес өңделеді.',
    contractorNote:'Орындаушының толық деректемелері мен қолы растаудан кейін PDF құжатына қосылады.'
  }:{
    title:'AGREEMENT FOR PAID SERVICES',subtitle:'electrical installation and/or CCTV installation',city:'Almaty',date:'Date',
    contractor:'Contractor',client:'Client',titlePart:'SUBJECT MATTER',types:'Services',task:'Scope of work',location:'Site address',
    materials:'MATERIALS',supplied:'Materials and equipment provided by',spec:'SPECIFICATION',
    name:'Description',unit:'Unit',qty:'Qty',price:'Price',sum:'Amount',specTotal:'Specification total',
    cost:'FEES AND PAYMENT',costTotal:'Total amount',advance:'Advance',balance:'Balance',payment:'Payment terms',
    timelines:'SCHEDULE',begin:'Start',end:'Completion',parties:'PARTY OBLIGATIONS',accept:'ACCEPTANCE AND WARRANTY',
    warranty:'Warranty period',months:'months',liability:'LIABILITY',digital:'ELECTRONIC SIGNING',privacy:'PERSONAL DATA',
    details:'DETAILS AND SIGNATURES',fio:'Name',iin:'IIN/BIN',phone:'Phone',sign:'Signature',
    idDoc:'ID document',issuedBy:'Issued by',issuedOn:'Date of issue',
    draft:'This is a short preview. The full English contract will be generated as a Google Drive PDF.',
    intro:'The Contractor agrees to perform the stated services; the Client agrees to accept and pay for the result.',
    duties:'The Contractor shall perform diligently and on time, observe safety requirements and promptly report changes. The Client shall provide site access, accept and pay for the work.',
    acceptance:'Results are accepted by certificate. Objections are recorded there. The agreed warranty applies.',
    responsibility:'The parties remain responsible under the full agreement and applicable legislation of Kazakhstan.',
    signNote:'The on-screen signature and consent are recorded. A signed PDF is created once the Contractor approves.',
    dataNote:'Personal data is processed as necessary to perform the contract, subject to applicable law.',
    contractorNote:'Full Contractor details and signature will be added to the PDF upon approval.'
  };
  const opt=G('materials'),mat=opt.options[opt.selectedIndex]?.textContent||'';
  const materials=kk?{customer:'Тапсырыс беруші',contractor:'Орындаушы',mixed:'Аралас'}:{customer:'Client',contractor:'Contractor',mixed:'Mixed'};
  const rows=[...document.querySelectorAll('#tbody tr')].map((r,i)=>{
    const a=r.querySelector('.iname'),un=r.querySelector('.un'),q=r.querySelector('.qq'),pr=r.querySelector('.pp');
    const sum=(Number(q?.value)||0)*(Number(pr?.value)||0);
    return `<tr><td>${i+1}</td><td>${E(a?.value||'')}</td><td>${E(un?.value||'')}</td><td>${E(q?.value||0)}</td><td>${E(pr?.value||0)} ₸</td><td>${sum.toLocaleString('ru-RU')} ₸</td></tr>`;
  }).join('');
  const previewNumber=v('num')||({kz:'жіберілгеннен кейін беріледі',en:'assigned on submission'})[lang];
  let html=`<h2>${words.title} № ${E(previewNumber)}</h2><p style="text-align:center">${words.subtitle}</p><p>${words.city} · ${words.date}: ${new Date().toLocaleDateString(kk?'kk-KZ':'en-GB')}</p>`;
  const section=(index,key,body)=>`<p><b>${index}. ${words[key]}</b></p>${body}`;
  html+=section(1,'titlePart',`<p>${words.intro}</p><p><b>${words.client}:</b> ${V('customer')} · ${words.iin}: ${V('iin')} · ${words.idDoc}: № ${V('docNum')}, ${words.issuedBy}: ${V('docBy')}, ${words.issuedOn}: ${V('docDate')} · ${words.phone}: ${V('phone')}</p><p>${words.location}: ${V('objectAddress')}</p><p>${words.types}: ${E([...G('workType').selectedOptions].map(o=>o.textContent).join(', '))}</p><p>${words.task}: ${V('task')}</p>`);
  html+=section(2,'materials',`<p>${words.supplied}: ${E(materials[v('materials')]||mat)}.</p>`);
  html+=section(3,'spec',`<div class="table-scroll"><table><thead><tr><th>№</th><th>${words.name}</th><th>${words.unit}</th><th>${words.qty}</th><th>${words.price}</th><th>${words.sum}</th></tr></thead><tbody>${rows}</tbody></table></div><p>${words.specTotal}: ${E(G('specTot').textContent)} ₸</p>`);
  html+=section(4,'cost',`<p>${words.costTotal}: <b>${E((Number(v('total'))||0).toLocaleString('ru-RU'))} ₸</b>. ${words.advance}: ${E((Number(v('paid'))||0).toLocaleString('ru-RU'))} ₸. ${words.balance}: ${E(v('balance'))} ₸.</p><p>${words.payment}: ${V('payment')}</p>`);
  html+=section(5,'timelines',`<p>${words.begin}: ${V('start')}. ${words.end}: ${V('end')}.</p>`);
  html+=section(6,'parties',`<p>${words.duties}</p>`);
  html+=section(7,'accept',`<p>${words.acceptance} ${words.warranty}: ${V('warranty')} ${words.months}.</p>`);
  html+=section(8,'liability',`<p>${words.responsibility}</p>`);
  html+=section(9,'digital',`<p>${words.signNote}</p>`);
  html+=section(10,'privacy',`<p>${words.dataNote}</p>`);
  html+=section(11,'details',`<table><tr><td style="width:50%"><b>${words.contractor}</b><p>${words.contractorNote}</p></td><td><b>${words.client}</b><p>${words.fio}: ${V('customer')}<br>${words.iin}: ${V('iin')}<br>${words.idDoc}: № ${V('docNum')}, ${words.issuedBy}: ${V('docBy')}, ${words.issuedOn}: ${V('docDate')}<br>${words.phone}: ${V('phone')}</p><span id="cSigPlc">${words.sign}: __________________</span></td></tr></table>`);
  html+=`<p style="font-size:11px;color:#999">${words.draft}</p>`;
  G('contract').innerHTML=html;
}
