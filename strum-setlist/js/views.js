/* ---------- views ---------- */
function nav(active){const t=(h,id,l)=>`<a class="tab" href="${h}" ${active===id?'aria-current="page"':''}>${l}</a>`;
  return `<nav class="tabs">${t('#','songs','Songs')}${t('#changes','changes','Chord changes')}${t('#arcade','arcade','Arcade')}${t('#tv','tv','TV mode')}${t('#tuner','tuner','Tuner')}<button class="theme-btn" data-themebtn>${THEME_LABEL[theme]}</button></nav>`}
const CHAPTERS=STRUM_DATA.chapters;
const STEPS=STRUM_DATA.steps;








const LV={easy:'Easy',medium:'Medium',stretch:'Stretch'};
const lvOf=s=>s.level||'medium';
let lvFilter=store.get('ss-lvfilter','all');
let noCapo=store.get('ss-nocapo',false);
const passes=s=>(lvFilter==='all'||lvOf(s)===lvFilter)&&(!noCapo||!s.capo);
function filterRow(){return `<div class="lvfilter" role="group" aria-label="Filter songs"><span class="eyebrow">Show</span>${['all','easy','medium','stretch'].map(k=>`<button data-lvf="${k}" aria-pressed="${lvFilter===k}">${k==='all'?'All':LV[k]}</button>`).join('')}<span class="fsep" aria-hidden="true"></span><button data-nocapo aria-pressed="${noCapo}">No capo</button></div>`}
function bindFilters(rerender){const go=()=>{const y=window.scrollY;rerender();window.scrollTo(0,y)};
  document.querySelectorAll('[data-lvf]').forEach(b=>b.onclick=()=>{lvFilter=b.dataset.lvf;store.set('ss-lvfilter',lvFilter);go()});
  const nc=document.querySelector('[data-nocapo]');if(nc)nc.onclick=()=>{noCapo=!noCapo;store.set('ss-nocapo',noCapo);go()}}
const badge=s=>`<span class="lvl ${lvOf(s)}">${LV[lvOf(s)]}</span>`;
function songCard(s,i){const st=statuses[s.id]||'none';return `<a class="song" href="#song-${s.id}">
   <span class="num">${i+1}</span><span class="meta"><span class="t">${s.title} ${badge(s)}</span><span class="muted" style="font-size:.88rem">${s.artist} · ${s.skill}</span>
   <span class="pills">${songChords(s).map(c=>`<span class="pill ${s.barre&&s.barre[c]&&lvlOf(s)==='full'?'barre':''}">${c}</span>`).join('')}${s.capo?`<span class="pill" style="background:var(--hot-soft)">capo ${s.capo}</span>`:''}</span></span>
   <span class="status ${st}">${STATUS[st]}</span></a>`}
function home(){
  $('#player').hidden=true;
  $('#app').innerHTML=`<header style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Your guitar practice</p><h1>Strum Setlist</h1>
  <p class="muted">Every song is labeled Easy, Medium, or Stretch. Mix a familiar song with a new one each session. Tap a song for the chords, strum patterns, and a play-along.</p></header>${nav('songs')}
  ${filterRow()}
  <nav class="chap-nav">${CHAPTERS.map(c=>{const list=SONGS.filter(s=>s.chapter===c.n),got=list.filter(s=>statuses[s.id]==='got').length,ez=list.filter(s=>lvOf(s)==='easy').length;
    return `<button class="chap-chip" data-ch="${c.n}"><span class="eyebrow">Chapter ${c.n}</span><strong>${c.name}</strong><span class="muted">${got} of ${list.length} can play · ${ez} easy</span></button>`}).join('')}</nav>
  ${CHAPTERS.map(c=>{const all=SONGS.filter(s=>s.chapter===c.n);let lastStep=0;
   const items=all.map((s,i)=>({s,i})).filter(({s})=>passes(s));
   return `<section class="chapter" id="chapter-${c.n}"><div style="display:flex;flex-direction:column;gap:6px"><p class="eyebrow">Chapter ${c.n}</p><h2>${c.name}</h2><p class="muted">${c.blurb}</p></div>
   <div class="list">${items.length?items.map(({s,i})=>{let h='';if(s.step&&s.step!==lastStep){lastStep=s.step;h=`<p class="step">${STEPS[c.n][s.step]}</p>`}return h+songCard(s,i)}).join(''):`<p class="muted">No songs in this chapter match these filters.</p>`}</div></section>`}).join('')}`;
  bindFilters(home);
  document.querySelectorAll('.chap-chip').forEach(b=>b.onclick=()=>{const el=$('#chapter-'+b.dataset.ch);if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})});
}
function feelTag(sec,s){const t=[];if(sec.vol&&sec.vol<.8)t.push('Soft');else if(sec.vol&&sec.vol>1.05)t.push('Loud');if(sec.pm||s.pm)t.push('Palm muted');return t}
function patRows(p,id){const chunks=p.length>8?[p.slice(0,8),p.slice(8)]:[p];
  return chunks.map((ch,j)=>`${chunks.length>1?`<span class="barlab">Bar ${j+1}</span>`:''}<div class="row" data-row="${id}-${j}">${[...ch].map(d=>`<span class="arw ${clsOf(d)}">${symOf(d)}</span>`).join('')}</div>
   <div class="row">${CNT.map((n,i)=>`<span class="cnt ${i%2?'':'beat'}">${n}</span>`).join('')}</div>`).join('')}
function patternCard(s){
  const groups=[];s.sections.forEach((sec,si)=>{const base=secPat(s,si),tags=feelTag(sec,s),key=base+'|'+(sec.fill||'')+'|'+tags.join();
    const g=groups.find(x=>x.key===key);if(g)g.names.push(sec.name);else groups.push({key,si,base,fill:sec.fill,tags,names:[sec.name]})});
  const all=s.sections.map((x,i)=>secPat(s,i)+(x.fill||'')).join('');
  return `<section class="pattern" aria-label="Strum patterns"><div class="sec-h"><h3>Strum pattern${groups.length>1?'s':''}</h3><span class="muted" style="font-size:.8rem">${groups.length>1?'changes by section':''}</span></div>
   ${groups.map(g=>`<div class="pgroup"><div class="sec-h"><span class="pname">${g.names.join(', ')}${g.tags.length?` <span class="ftag">${g.tags.join(' · ')}</span>`:''}</span><button class="hear" data-hear="${g.si}">▶ Hear it</button></div>
     ${patRows(g.base,'b'+g.si)}${g.fill?`<span class="barlab">Last bar of the section</span>${patRows(g.fill,'f'+g.si)}`:''}</div>`).join('')}
   <details class="legend"><summary>What the symbols mean</summary><p class="muted" style="font-size:.85rem">↓ strum down &nbsp; ↑ strum up &nbsp; · keep your hand moving but miss the strings.${/[du]/.test(all)?' &nbsp; Small faded arrows are light strums: brush just a few strings softly. Mixing light and full strums is what makes a pattern groove instead of sounding mechanical.':''}${/[Xx]/.test(all)?' &nbsp; ✕ chuck: strum down while the side of your palm lands on the strings, for a muted click.':''}${/[Bb]/.test(all)?' &nbsp; B pick just the lowest note of the chord.':''}${s.pm||s.sections.some(x=>x.pm)?' &nbsp; Palm mute: rest the edge of your strumming hand on the strings right by the bridge.':''} Hear it plays four bars at the tempo in the bottom bar. Count out loud: one and two and three and four and.</p></details></section>`;
}
function songView(id){
  const s=SONGS.find(x=>x.id===id);if(!s)return home();
  if(P.song!==s){stop();P.song=s;P.loop=null;setBpm(s.bpm[0])}
  const st=statuses[s.id]||'none';
  $('#app').innerHTML=`<a class="back" href="#">← Chapter ${s.chapter}: ${CHAPTERS[s.chapter-1].name}</a>
  <header style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">${s.artist}</p><h2>${s.title}</h2><div>${badge(s)}</div></header>
  <div class="facts"><div class="fact"><span class="eyebrow">Capo</span><b>${s.capo?'Fret '+s.capo:'None'}</b></div>
   <div class="fact"><span class="eyebrow">Sounds in</span><b>${s.key}</b></div>
   <div class="fact"><span class="eyebrow">Start at</span><b>${s.bpm[0]} bpm</b></div>
   <div class="fact"><span class="eyebrow">Record tempo</span><b>${s.bpm[1]?`~${s.bpm[1]} bpm <button class="usebpm" data-usebpm="${s.bpm[1]}">Use</button>`:'Match by ear'}</b></div></div>
  <div class="playbtns"><button class="btn bigplay" id="bigPlay">▶ Play along in big view</button><button class="btn bigplay tvbtn" id="tvBtn">📺 TV mode</button></div>
  <details class="howto"><summary>How to play it: ${s.skill}</summary><p>${s.tip}</p></details>
  ${patternCard(s)}
  ${s.barre?`<section class="sec"><h3>Barre chord shape</h3><div class="seg" role="group" aria-label="Shape difficulty">${['easy','full'].map(l=>`<button data-lvl="${l}" aria-pressed="${lvlOf(s)===l}">${l==='easy'?'Easier shapes':'Full barres'}</button>`).join('')}</div>
   <p class="muted" style="font-size:.85rem">Play the whole song with the easier shape first. Switch to the harder one when the changes feel smooth. The play-along uses whichever you pick.</p></section>`:''}
  <div class="statusrow" role="group" aria-label="Progress">${Object.keys(STATUS).map(k=>`<button data-st="${k}" aria-pressed="${k===st}">${STATUS[k]}</button>`).join('')}</div>
  <section class="sec"><h3>Chord shapes</h3><p class="muted" style="font-size:.85rem">Shapes as you fret them${s.capo?' with the capo on':''}. Tap one to hear it.</p>
   <div class="chords">${songChords(s).map(c=>`<button class="chord" data-c="${c}">${diagram(shapeOf(s,c))}<span>${shapeName(s,c)}</span></button>`).join('')}</div></section>
  ${s.sections.map((sec,si)=>{const tags=feelTag(sec,s);return `<section class="sec"><div class="sec-h"><h3>${sec.name}${sec.repeat>1?` <span class="muted" style="font-size:.9rem">×${sec.repeat}</span>`:''}${tags.length?` <span class="ftag">${tags.join(' · ')}</span>`:''}</h3>
   <button class="loopbtn" data-loop="${si}" aria-pressed="false">Loop this</button></div>
   <div class="bars">${sec.bars.map((b,bi)=>`<div class="bar" data-s="${si}" data-b="${bi}"><span class="cs">${b.map(c=>`<span>${c}</span>`).join('')}</span><span class="mini">${[...barPat(s,si,bi,bi===sec.bars.length-1)].map(d=>`<i class="${isSoft(d)?'soft':''}">${symOf(d)}</i>`).join('')}</span></div>`).join('')}</div></section>`}).join('')}
  <details class="howto"><summary>About the play-along</summary><p class="muted" style="font-size:.85rem">The play-along is one acoustic guitar, so it will not sound like a full band recording. It shows how the guitar part should feel: where the strums land, which ones are light, and how each section changes.</p>
  <p class="muted" style="font-size:.85rem">Guitar sound uses acoustic guitar samples from nbrosowsky/tonejs-instruments, licensed CC BY 3.0, trimmed and converted for this app.</p>
  <p class="muted" style="font-size:.85rem">Each box is one bar of four beats. Two chords in a box means two beats each. Lyrics are not included; sing along from memory or keep a lyric site open.</p></details>`;
  $('#player').hidden=false;resetNow();updateLoop();
  document.querySelectorAll('[data-hear]').forEach(b=>b.onclick=()=>hearPattern(s,+b.dataset.hear,b));
  document.querySelectorAll('[data-usebpm]').forEach(b=>b.onclick=()=>setBpm(+b.dataset.usebpm));
  $('#bigPlay').onclick=pvOpen;$('#tvBtn').onclick=tvOpen;
  if(TV.pending){TV.pending=false;tvOpen()}
  document.querySelectorAll('[data-lvl]').forEach(b=>b.onclick=()=>{barreLvl[s.id]=b.dataset.lvl;store.set('ss-barre',barreLvl);const y=window.scrollY;songView(s.id);window.scrollTo(0,y)});
  document.querySelectorAll('.statusrow button').forEach(b=>b.onclick=()=>{statuses[s.id]=b.dataset.st;store.set('ss-status',statuses);
    document.querySelectorAll('.statusrow button').forEach(x=>x.setAttribute('aria-pressed',x===b))});
  document.querySelectorAll('.chord').forEach(b=>b.onclick=()=>{const c=ac();if(c.state==='suspended')c.resume();strum(c.currentTime+.02,shapeOf(s,b.dataset.c),s.capo,'D',false)});
  document.querySelectorAll('.loopbtn').forEach(b=>b.onclick=()=>{const v=+b.dataset.loop;P.loop=P.loop===v?null:v;updateLoop();if(P.playing){stop();start()}else resetNow()});
}
function updateLoop(){document.querySelectorAll('.loopbtn').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.loop===P.loop));
  $('#loopLabel').textContent='Looping: '+(P.loop===null?'whole song':P.song.sections[P.loop].name)}
