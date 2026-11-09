const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

/* ===== PŘEKLADY / TRANSLATIONS ===== */
const T={
cs:{title:'Matěj Přívozník – osobní stránka',
n1:'Cesta',n2:'Dovednosti',n3:'Silné stránky',n4:'Zájmy',n5:'Kontakt',th:'Přepnout světlý a tmavý režim',
lead:'Studuji aplikovanou informatiku na Univerzitě Hradec Králové. Programuji v Javě a na webu, vyrostl jsem na elektrotechnice a průmyslové automatizaci a praxi mám od elektroinstalací přes CNC stroje až po sklad.',
f2:'🚗 Řidičský průkaz B',f3:'🎂 ročník 2005',s1:'roky praxe',s2:'pracovních pozic',s3:'programovacích technologií',
cta1:'Napsat mi',cta2:'Zkopírovat e-mail',
ah2:'Arduino: rozblikejte LED',ap:'Zapněte obvod a posuvníkem měňte délku pauzy.',on:'Zapnout',off:'Vypnout',
sub1:'Posuňte časovou osu a uvidíte, čím jsem se v daném měsíci zabýval. Karty se dají rozbalit a filtrovat.',mal:'Měsíc na časové ose',
f_all:'Vše',c_skola:'Škola',c_elektro:'Elektro',c_vyroba:'Výroba',c_sklad:'Sklad',now:'dosud',today:'dnes',
sub2:'Úrovně jsou stejné jako v mém životopise.',t1:'Programování',t2:'Počítač',t4:'Jazyky',so2:'Seřadit podle úrovně',
g1:'Mé silné stránky',g2:'Mohu nabídnout',z1:'Florbal',z2:'Hraní her',z3:'Klikněte a rozblikám LED nahoře',
h5:'Napište mi',sub5:'Zkopírujte kontakt jedním kliknutím, nebo mi napište rovnou odsud.',k1:'Telefon',k2:'E-mail',k3:'Bydliště',copy:'Kopírovat',
ph_n:'Vaše jméno',ph_e:'Váš e-mail (abych mohl odpovědět)',ph_m:'Vaše zpráva',send:'Odeslat zprávu',sending:'Odesílám…',up:'Nahoru',
copied:'Zkopírováno: ',sent:'Zpráva odeslána',v_err:'Vyplňte prosím jméno, platný e-mail a zprávu.',nokey:'Formulář ještě není nastavený (chybí access key).',
ok:'Díky, zpráva byla odeslána.',err:'Odeslání se nepovedlo. Zkuste to prosím znovu, nebo mi napište přímo na e-mail.',subj:'Zpráva z osobní stránky'},
en:{title:'Matěj Přívozník – personal website',
n1:'Journey',n2:'Skills',n3:'Strengths',n4:'Interests',n5:'Contact',th:'Toggle light and dark mode',
lead:'I study Applied Informatics at the University of Hradec Králové. I program in Java and for the web, I grew up on electrical engineering and industrial automation, and I have hands-on experience ranging from electrical installations through CNC machines to warehouse work.',
f2:'🚗 Driving licence B',f3:'🎂 born 2005',s1:'years of experience',s2:'job positions',s3:'programming technologies',
cta1:'Get in touch',cta2:'Copy email',
ah2:'Arduino: blink the LED',ap:'Switch on the circuit and use the slider to change the length of the pause.',on:'Switch on',off:'Switch off',
sub1:'Move the timeline slider to see what I was working on in a given month. Cards can be expanded and filtered.',mal:'Month on the timeline',
f_all:'All',c_skola:'School',c_elektro:'Electrical',c_vyroba:'Manufacturing',c_sklad:'Warehouse',now:'present',today:'today',
sub2:'The levels are the same as in my CV.',t1:'Programming',t2:'Computer',t4:'Languages',so2:'Sort by level',
g1:'My strengths',g2:'What I can offer',z1:'Floorball',z2:'Gaming',z3:'Click and I will blink the LED at the top',
h5:'Write to me',sub5:'Copy a contact with one click, or write to me right from here.',k1:'Phone',k2:'Email',k3:'Residence',copy:'Copy',
ph_n:'Your name',ph_e:'Your email (so I can reply)',ph_m:'Your message',send:'Send message',sending:'Sending…',up:'Back to top',
copied:'Copied: ',sent:'Message sent',v_err:'Please fill in your name, a valid email and a message.',nokey:'The form is not set up yet (access key is missing).',
ok:'Thanks, your message has been sent.',err:'Sending failed. Please try again or email me directly.',subj:'Zpráva z osobní stránky (EN)'}
};
const MO={cs:['leden','únor','březen','duben','květen','červen','červenec','srpen','září','říjen','listopad','prosinec'],
en:['January','February','March','April','May','June','July','August','September','October','November','December']};
const LK='mp-lang';let lg='';
try{lg=localStorage.getItem(LK)||''}catch(_){}
if(!T[lg])lg=/^(cs|sk)/i.test(navigator.language||'')?'cs':'en';
const t=k=>T[lg][k],P=x=>Array.isArray(x)?x[lg=='cs'?0:1]:x;
const fmt=a=>MO[lg][a[1]-1]+' '+a[0],ix=a=>a[0]*12+a[1]-1;

/* ===== PSACÍ EFEKT ===== */
const ROLES=[['Student aplikované informatiky','Applied Informatics student'],['Slaboproudý elektrikář','Low-voltage electrician'],['Nadšenec do Arduina','Arduino enthusiast']];
const ty=$('#ty'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;let ri=0,rj=0,rd=0;
function typ(){const w=P(ROLES[ri]);if(rm){ty.textContent=P(ROLES[0]);return}
ty.textContent=w.slice(0,rj);if(!rd&&rj>=w.length){rd=1;return setTimeout(typ,1600)}
if(rd&&rj<=0){rd=0;ri=(ri+1)%ROLES.length}rj+=rd?-1:1;setTimeout(typ,rd?35:70)}
typ();

/* ===== POČÍTADLA ===== */
$$('[data-n]').forEach(e=>{const n=+e.dataset.n;let k=0;const q=setInterval(()=>{e.textContent=++k;if(k>=n){clearInterval(q);e.textContent=n+(e.dataset.p||'')}},250)});

/* ===== ARDUINO LED ===== */
let on=false,tm,d=500;const led=$('#led'),bd=$('.bd'),pw=$('#pw');
const blink=()=>{clearInterval(tm);led.classList.remove('on');bd.classList.toggle('on',on);if(!on)return;led.classList.add('on');tm=setInterval(()=>led.classList.toggle('on'),d)};
pw.onclick=()=>{on=!on;pw.textContent=on?t('off'):t('on');pw.setAttribute('aria-pressed',on);blink()};
$('#dl').oninput=e=>{d=+e.target.value;$$('.dv').forEach(x=>x.textContent=d);if(on)blink()};

/* ===== ČASOVÁ OSA ===== */
const E=[
{t:['Operátor CNC strojů','CNC machine operator'],o:'IMG Bohemia',c:'vyroba',a:[2026,8],b:[2026,10],d:['3 měsíce','3 months'],x:['Nastavení a užívání CNC stroje na obrábění plastů.','Setting up and operating a CNC machine for machining plastics.']},
{t:['Skladník / manipulant','Warehouse worker'],o:'4Camping',c:'sklad',a:[2026,6],b:[2026,9],d:['4 měsíce','4 months'],x:['Sbírání a balení zboží.','Picking and packing goods.']},
{t:['Elektrikář – slaboproud','Low-voltage electrician'],o:'Sumo s.r.o.',c:'elektro',a:[2026,2],b:[2026,6],d:['5 měsíců','5 months'],x:['Elektroinstalace, rozvaděče, hromosvody.','Electrical installations, switchboards, lightning protection.']},
{t:['Aplikovaná informatika','Applied Informatics'],o:['Univerzita Hradec Králové','University of Hradec Králové'],c:'skola',a:[2025,9],b:null,d:['bakalářské studium','bachelor’s degree'],x:['Aktuálně studuji bakalářský program Aplikovaná informatika.','Currently studying the bachelor’s programme in Applied Informatics.']},
{t:['Pomocný dělník','Installation helper'],o:'Chládek a Tintěra a.s.',c:'elektro',a:[2025,6],b:[2026,5],d:['1 rok','1 year'],x:['Zavádění trubiček do baráků, dělání optické sítě, zafukování kabelů, přidělávání a vrtání lišt a krabiček, sváření optických vláken.','Installing microducts into buildings, building fibre-optic networks, blowing in cables, mounting and drilling cable trunking and boxes, fusion splicing of optical fibres.']},
{t:['Brigádník','Part-time worker'],o:'Awos s.r.o.',c:'vyroba',a:[2022,3],b:[2025,7],d:['3 roky a 5 měsíců','3 years and 5 months'],x:['Obsluha linek pro osazování DPS, kontrola DPS, pájení.','Operating PCB assembly lines, PCB inspection, soldering.']},
{t:['Elektrotechnika (Průmyslová automatizace)','Electrical Engineering (Industrial Automation)'],o:'SPŠE a VOŠ Pardubice',c:'skola',a:[2021,9],b:[2025,5],d:['střední škola s maturitou','secondary school with maturita exam'],x:['Střední průmyslová škola elektrotechnická a Vyšší odborná škola Pardubice, obor Elektrotechnika se zaměřením na průmyslovou automatizaci.','Secondary technical school of electrical engineering and Higher Vocational School in Pardubice, Electrical Engineering programme with a focus on industrial automation.']}];
let flt='all',tc=0;const opened=new Set([0]);
const apf=()=>$$('.it').forEach(li=>li.hidden=flt!='all'&&li.dataset.c!=flt);
function rt(){$('#tl').innerHTML=E.map((e,i)=>`<li class="it" data-c="${e.c}"><button aria-expanded="${opened.has(i)}"><span class="tag">${t('c_'+e.c)}</span><b>${P(e.t)}</b><span>${P(e.o)}</span><small>${fmt(e.a)} – ${e.b?fmt(e.b):t('now')}, ${P(e.d)}</small></button><div class="x"><p>${P(e.x)}</p></div></li>`).join('');apf();sc()}
$('#tl').onclick=e=>{const b=e.target.closest('button');if(!b)return;const o=b.getAttribute('aria-expanded')!='true',i=$$('.it').indexOf(b.closest('.it'));b.setAttribute('aria-expanded',o);o?opened.add(i):opened.delete(i)};
$('#fl').onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;flt=b.dataset.f;$$('#fl .ch').forEach(x=>x.classList.toggle('on',x==b));apf()};
const B=ix([2021,9]),sl=$('#sl');
function sc(){const v=B+ +sl.value;$('#so').textContent=MO[lg][v%12]+' '+Math.floor(v/12)+(sl.value==sl.max?' ('+t('today')+')':'');if(!tc)return;
$$('.it').forEach((li,i)=>{const e=E[i],a=v>=ix(e.a)&&(!e.b||v<=ix(e.b));li.classList.toggle('act',a);li.classList.toggle('dim',!a)})}
sl.oninput=()=>{tc=1;sc()};

/* ===== DOVEDNOSTI ===== */
const ADV=['pokročilý','advanced'];
const S={prog:[['HTML','senior',90],['Java','mid',60],['CSS','mid',60],['Spring Boot','junior',35],['C#','junior',35],['SQL','junior',35]],
pc:['MS Windows 8 / 10 / 11','MS Word','MS Excel','MS PowerPoint',['Prohlížeč a e-mail','Browser and email'],'MS Outlook',['Psaní všemi deseti','Touch typing'],'AI','IntelliJ IDEA','VS Code'].map(n=>[n,ADV,80]),
jaz:[[['Čeština','Czech'],['výborná','excellent'],100],[['Angličtina','English'],['středně pokročilá','intermediate'],60]],
el:['Mosaic Tecomat Foxtrot','Arduino','PLC Siemens LOGO',['Průmyslová automatizace','Industrial automation'],['Elektroinstalace','Electrical installation'],['Rozvaděče','Switchboards'],['Hromosvody','Lightning protection'],['Optické sítě','Optical networks'],['Pájení DPS','PCB soldering']]};
let tab='prog',srt=false;
function rs(){const sk=$('#sk');$('#so2').hidden=tab=='el';
if(tab=='el'){sk.className='fx';sk.innerHTML=S.el.map(x=>`<li class="ch">${P(x)}</li>`).join('');return}
const a=[...S[tab]];if(srt)a.sort((x,y)=>y[2]-x[2]);
sk.className='';sk.innerHTML=a.map(([n,l,p])=>`<li><span>${P(n)}</span><div class="br"><i style="--w:${p}%"></i></div><em>${P(l)}</em></li>`).join('');
requestAnimationFrame(()=>requestAnimationFrame(()=>sk.classList.add('go')))}
$('#tb').onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;tab=b.dataset.t;$$('#tb [data-t]').forEach(x=>x.classList.toggle('on',x==b));rs()};
$('#so2').onclick=e=>{srt=!srt;e.currentTarget.classList.toggle('on',srt);e.currentTarget.setAttribute('aria-pressed',srt);rs()};

/* ===== SILNÉ STRÁNKY ===== */
const G={a:[['Aktivní přístup','Proactive approach'],['Pracovitost','Hard-working'],['Přizpůsobivost','Adaptability'],['Samostatnost','Independence'],['Spolehlivost, zodpovědnost','Reliability and responsibility']],
b:[['Logické myšlení','Logical thinking'],['Řešení problémů pomocí kritického myšlení','Problem solving through critical thinking'],['Schopnost práce v kolektivu a týmové práce','Ability to work in a team']]};
let gk='a';
const rg=()=>$('#gc').innerHTML=G[gk].map((x,i)=>`<li class="ch" style="animation-delay:${i*70}ms">${P(x)}</li>`).join('');
$('#tb2').onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;$$('#tb2 .ch').forEach(x=>x.classList.toggle('on',x==b));gk=b.dataset.t;rg()};

/* ===== ZÁJMY ===== */
$('#zg').onclick=e=>{const z=e.target.closest('.zt');if(!z)return;z.classList.remove('bn');void z.offsetWidth;z.classList.add('bn');if(z.dataset.a){$('#uvod').scrollIntoView({behavior:'smooth'});if(!on)pw.click()}};

/* ===== KOPÍROVÁNÍ + TOAST ===== */
let tt;const toast=m=>{const o=$('#ts');o.textContent=m;o.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>o.classList.remove('on'),2200)};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-cp]');if(!b)return;const v=b.dataset.cp;
try{await navigator.clipboard.writeText(v)}catch(_){const a=document.createElement('textarea');a.value=v;document.body.append(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}toast(t('copied')+v)});

/* ===== FORMULÁŘ ===== */
const KEY='VLOZ_SVUJ_ACCESS_KEY';
const cf=$('#cf'),fs=$('#fs'),sb=cf.querySelector('button[type=submit]');
const say=(m,ok)=>{fs.textContent=m;fs.className=ok?'ok':'err'};
cf.onsubmit=async e=>{e.preventDefault();
if(!cf.checkValidity()){say(t('v_err'),0);return}
if(KEY.startsWith('VLOZ')){say(t('nokey'),0);return}
sb.disabled=true;sb.textContent=t('sending');say('',1);
try{
const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
body:JSON.stringify({access_key:KEY,subject:t('subj'),from_name:'Osobní stránka',name:$('#fn').value,email:$('#fe').value,message:$('#fm').value,botcheck:$('#bc').checked})});
const j=await r.json();
if(r.ok&&j.success){cf.reset();say(t('ok'),1);toast(t('sent'))}else throw 0
}catch(_){say(t('err'),0)}
sb.disabled=false;sb.textContent=t('send')};

/* ===== MOTIV, SCROLL, NAVIGACE ===== */
$('#th').onclick=()=>{const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme=='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dk?'light':'dark'};
const pb=$('#pb'),up=$('#up');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;pb.style.width=(m>0?scrollY/m*100:0)+'%';up.classList.toggle('sh',scrollY>600)},{passive:true});
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)$$('nav a').forEach(a=>a.classList.toggle('on',a.hash=='#'+x.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
$$('main section').forEach(s=>io.observe(s));

/* ===== PŘEPÍNAČ JAZYKA ===== */
function setLang(l){lg=l;try{localStorage.setItem(LK,l)}catch(_){}
document.documentElement.lang=l;document.title=t('title');
$$('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));
$$('[data-ph]').forEach(e=>{const v=t(e.dataset.ph);e.placeholder=v;e.setAttribute('aria-label',v)});
$$('[data-al]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.al)));
$$('.fg').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l==l));
pw.textContent=on?t('off'):t('on');if(!sb.disabled)sb.textContent=t('send');fs.textContent='';
rt();rs();rg();rj=0;rd=0;if(rm)typ()}
$('.lw').onclick=e=>{const b=e.target.closest('[data-l]');if(b&&b.dataset.l!=lg)setLang(b.dataset.l)};
setLang(lg);
