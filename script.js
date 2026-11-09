const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const M=['leden','únor','březen','duben','květen','červen','červenec','srpen','září','říjen','listopad','prosinec'];
const fmt=a=>M[a[1]-1]+' '+a[0],ix=a=>a[0]*12+a[1]-1;
const R=['Student aplikované informatiky','Slaboproudý elektrikář','Nadšenec do Arduina'];
(()=>{const el=$('#ty');if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=R[0];return}
let i=0,j=0,d=0;(function s(){const w=R[i];el.textContent=w.slice(0,j);if(!d&&j==w.length){d=1;return setTimeout(s,1600)}
if(d&&j==0){d=0;i=(i+1)%R.length}j+=d?-1:1;setTimeout(s,d?35:70)})()})();
$$('[data-n]').forEach(e=>{const n=+e.dataset.n;let k=0;const t=setInterval(()=>{e.textContent=++k;if(k>=n){clearInterval(t);e.textContent=n+(e.dataset.p||'')}},250)});
let on=false,tm,d=500;const led=$('#led'),bd=$('.bd'),pw=$('#pw');
const blink=()=>{clearInterval(tm);led.classList.remove('on');bd.classList.toggle('on',on);if(!on)return;led.classList.add('on');tm=setInterval(()=>led.classList.toggle('on'),d)};
pw.onclick=()=>{on=!on;pw.textContent=on?'Vypnout':'Zapnout';pw.setAttribute('aria-pressed',on);blink()};
$('#dl').oninput=e=>{d=+e.target.value;$$('.dv').forEach(x=>x.textContent=d);if(on)blink()};
const E=[
{t:'Operátor CNC strojů',o:'IMG Bohemia',c:'vyroba',a:[2026,8],b:[2026,10],d:'3 měsíce',x:'Nastavení a užívání CNC stroje na obrábění plastů.'},
{t:'Skladník / manipulant',o:'4Camping',c:'sklad',a:[2026,6],b:[2026,9],d:'4 měsíce',x:'Sbírání a balení zboží.'},
{t:'Elektrikář – slaboproud',o:'Sumo s.r.o.',c:'elektro',a:[2026,2],b:[2026,6],d:'5 měsíců',x:'Elektroinstalace, rozvaděče, hromosvody.'},
{t:'Aplikovaná informatika',o:'Univerzita Hradec Králové',c:'skola',a:[2025,9],b:null,d:'bakalářské studium',x:'Aktuálně studuji bakalářský program Aplikovaná informatika.'},
{t:'Pomocný dělník',o:'Chládek a Tintěra a.s.',c:'elektro',a:[2025,6],b:[2026,5],d:'1 rok',x:'Zavádění trubiček do baráků, dělání optické sítě, zafukování kabelů, přidělávání a vrtání lišt a krabiček, sváření optických vláken.'},
{t:'Brigádník',o:'Awos s.r.o.',c:'vyroba',a:[2022,3],b:[2025,7],d:'3 roky a 5 měsíců',x:'Obsluha linek pro osazování DPS, kontrola DPS, pájení.'},
{t:'Elektrotechnika (Průmyslová automatizace)',o:'SPŠE a VOŠ Pardubice',c:'skola',a:[2021,9],b:[2025,5],d:'střední škola s maturitou',x:'Střední průmyslová škola elektrotechnická a Vyšší odborná škola Pardubice, obor Elektrotechnika se zaměřením na průmyslovou automatizaci.'}];
const L={skola:'Škola',elektro:'Elektro',vyroba:'Výroba',sklad:'Sklad'};
$('#tl').innerHTML=E.map((e,i)=>`<li class="it" data-c="${e.c}"><button aria-expanded="${i<1}"><span class="tag">${L[e.c]}</span><b>${e.t}</b><span>${e.o}</span><small>${fmt(e.a)} – ${e.b?fmt(e.b):'dosud'}, ${e.d}</small></button><div class="x"><p>${e.x}</p></div></li>`).join('');
$('#tl').onclick=e=>{const b=e.target.closest('button');if(b)b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')!='true')};
$('#fl').onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;$$('#fl .ch').forEach(x=>x.classList.toggle('on',x==b));$$('.it').forEach(li=>li.hidden=b.dataset.f!='all'&&li.dataset.c!=b.dataset.f)};
const B=ix([2021,9]),sl=$('#sl');let tc=0;
const sc=()=>{const v=B+ +sl.value;$('#so').textContent=M[v%12]+' '+Math.floor(v/12)+(sl.value==sl.max?' (dnes)':'');if(!tc)return;
$$('.it').forEach((li,i)=>{const e=E[i],a=v>=ix(e.a)&&(!e.b||v<=ix(e.b));li.classList.toggle('act',a);li.classList.toggle('dim',!a)})};
sl.oninput=()=>{tc=1;sc()};sc();
const S={prog:[['HTML','senior',90],['Java','mid',60],['CSS','mid',60],['Spring Boot','junior',35],['C#','junior',35],['SQL','junior',35]],
pc:['MS Windows 8 / 10 / 11','MS Word','MS Excel','MS PowerPoint','Prohlížeč a e-mail','MS Outlook','Psaní všemi deseti','AI','IntelliJ IDEA','VS Code'].map(n=>[n,'pokročilý',80]),
jaz:[['Čeština','výborná',100],['Angličtina','středně pokročilá',60]],
el:['Mosaic Tecomat Foxtrot','Arduino','PLC Siemens LOGO','Průmyslová automatizace','Elektroinstalace','Rozvaděče','Hromosvody','Optické sítě','Pájení DPS']};
let tab='prog',srt=false;
function rs(){const sk=$('#sk');$('#so2').hidden=tab=='el';
if(tab=='el'){sk.className='fx';sk.innerHTML=S.el.map(x=>`<li class="ch">${x}</li>`).join('');return}
const a=[...S[tab]];if(srt)a.sort((x,y)=>y[2]-x[2]);
sk.className='';sk.innerHTML=a.map(([n,l,p])=>`<li><span>${n}</span><div class="br"><i style="--w:${p}%"></i></div><em>${l}</em></li>`).join('');
requestAnimationFrame(()=>requestAnimationFrame(()=>sk.classList.add('go')))}
$('#tb').onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;tab=b.dataset.t;$$('#tb [data-t]').forEach(x=>x.classList.toggle('on',x==b));rs()};
$('#so2').onclick=e=>{srt=!srt;e.currentTarget.classList.toggle('on',srt);e.currentTarget.setAttribute('aria-pressed',srt);rs()};rs();
const G={a:['Aktivní přístup','Pracovitost','Přizpůsobivost','Samostatnost','Spolehlivost, zodpovědnost'],b:['Logické myšlení','Řešení problémů pomocí kritického myšlení','Schopnost práce v kolektivu a týmové práce']};
const rg=k=>$('#gc').innerHTML=G[k].map((x,i)=>`<li class="ch" style="animation-delay:${i*70}ms">${x}</li>`).join('');
$('#tb2').onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;$$('#tb2 .ch').forEach(x=>x.classList.toggle('on',x==b));rg(b.dataset.t)};rg('a');
$('#zg').onclick=e=>{const t=e.target.closest('.zt');if(!t)return;t.classList.remove('bn');void t.offsetWidth;t.classList.add('bn');if(t.dataset.a){$('#uvod').scrollIntoView({behavior:'smooth'});if(!on)pw.click()}};
let tt;const toast=m=>{const t=$('#ts');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-cp]');if(!b)return;const v=b.dataset.cp;
try{await navigator.clipboard.writeText(v)}catch(_){const a=document.createElement('textarea');a.value=v;document.body.append(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}toast('Zkopírováno: '+v)});
const KEY='f7b688b5-f70b-43c9-83c3-85d02c7c8837';
const cf=$('#cf'),fs=$('#fs');
const say=(m,ok)=>{fs.textContent=m;fs.className=ok?'ok':'err'};
cf.onsubmit=async e=>{e.preventDefault();
const btn=cf.querySelector('button[type=submit]');
if(!cf.checkValidity()){say('Vyplňte prosím jméno, platný e-mail a zprávu.',0);return}
if(KEY.startsWith('VLOZ')){say('Formulář ještě není nastavený (chybí access key).',0);return}
btn.disabled=true;btn.textContent='Odesílám…';say('',1);
try{
const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
body:JSON.stringify({access_key:KEY,subject:'Zpráva z osobní stránky',from_name:'Osobní stránka',name:$('#fn').value,email:$('#fe').value,message:$('#fm').value,botcheck:$('#bc').checked})});
const d=await r.json();
if(r.ok&&d.success){cf.reset();say('Díky, zpráva byla odeslána.',1);toast('Zpráva odeslána')}else throw 0
}catch(_){say('Odeslání se nepovedlo. Zkuste to prosím znovu, nebo mi napište přímo na e-mail.',0)}
btn.disabled=false;btn.textContent='Odeslat zprávu'};
$('#th').onclick=()=>{const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme=='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dk?'light':'dark'};
const pb=$('#pb'),up=$('#up');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;pb.style.width=(m>0?scrollY/m*100:0)+'%';up.classList.toggle('sh',scrollY>600)},{passive:true});
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)$$('nav a').forEach(a=>a.classList.toggle('on',a.hash=='#'+x.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
$$('main section').forEach(s=>io.observe(s));
