/* ---------- app shell: navigation, page headers, toasts, recents, about, install ---------- */
const APP_NAME="Guns N' Sofas";
const APP_VERSION='1.1';
const REPO_URL='https://github.com/Melo21/guns-n-sofas';
const ICON={
  songs:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  practice:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 21h8M12 3 6.5 21M12 3l5.5 18M12 3v9l4-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  tv:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 21h8M12 18v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  tuner:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v7a3 3 0 0 0 6 0V3M12 13v8M9 21h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  settings:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  theme:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
};
const LOGO='<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="15" fill="var(--accent)"/><path d="M32 9c13 0 22 5 22 14 0 13-12 27-22 33C22 50 10 36 10 23 10 14 19 9 32 9z" fill="var(--logo-pick)"/><rect x="21" y="25" width="22" height="9" rx="3.5" fill="var(--accent)"/><rect x="17" y="31" width="30" height="10" rx="4" fill="var(--accent)"/><rect x="19" y="40" width="3" height="4" rx="1" fill="var(--accent)"/><rect x="42" y="40" width="3" height="4" rx="1" fill="var(--accent)"/></svg>';

const TABS=[{id:'songs',href:'#',label:'Songs'},{id:'practice',href:'#practice',label:'Practice'},{id:'tv',href:'#tv',label:'TV'},{id:'tuner',href:'#tuner',label:'Tuner'}];
function renderShell(){
  $('#appbar').innerHTML=`<div class="appbar-in"><a class="brand" href="#" aria-label="${APP_NAME} home">${LOGO}<span>${APP_NAME}</span></a>
    <nav class="topnav" aria-label="Main">${TABS.map(t=>`<a href="${t.href}" data-tab="${t.id}">${t.label}</a>`).join('')}</nav>
    <div class="appbar-actions"><button class="iconbtn" data-themebtn title="Change theme">${ICON.theme}</button><a class="iconbtn" href="#about" data-tab="about" title="Settings and about" aria-label="Settings and about">${ICON.settings}</a></div></div>`;
  $('#tabbar').innerHTML=TABS.map(t=>`<a href="${t.href}" data-tab="${t.id}">${ICON[t.id]}<span>${t.label}</span></a>`).join('');
}
function setActiveTab(id){document.querySelectorAll('[data-tab]').forEach(a=>{if(a.dataset.tab===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
function pageHead(title,sub,back){return `<header class="ph">${back?`<a class="back" href="${back[0]}">‹ ${back[1]}</a>`:''}<h1>${title}</h1>${sub?`<p class="sub">${sub}</p>`:''}</header>`}

/* toasts */
let toastTimer=0;
function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>{t.classList.remove('show');setTimeout(()=>{t.hidden=true},250)},2200)}

/* recently played */
let recent=store.get('ss-recent',[]);
function markRecent(id){recent=[id,...recent.filter(x=>x!==id)].slice(0,8);store.set('ss-recent',recent)}
function recentRow(){const list=recent.map(id=>SONGS.find(s=>s.id===id)).filter(Boolean);if(!list.length)return '';
  return `<section class="recent" aria-label="Recently played"><h2 class="sh">Jump back in</h2><div class="recent-row">${list.map(s=>{const st=statuses[s.id]||'none';
    return `<a class="rcard" href="#song-${s.id}"><b>${s.title}</b><span class="muted">${s.artist}</span><span class="status ${st}">${STATUS[st]}</span></a>`}).join('')}</div></section>`}

/* practice hub (chord change drill + games) */
function practice(){
  stop();$('#player').hidden=true;setActiveTab('practice');const b=bestAll(),drill=store.get('ss-best2',{});
  const best=(prefix,fmt)=>{const v=Object.entries(b).filter(([k])=>k.startsWith(prefix)).map(([,v])=>v);return v.length?fmt(Math.max(...v)):null};
  const drillBest=Object.values(drill).length?Math.max(...Object.values(drill).map(x=>x.bpm))+' bpm':null;
  const items=[
   {href:'#changes',name:'Chord changes',tag:'Guitar in hand',what:'Switch between two chords on a click for one minute.',best:drillBest},
   {href:'#game-roulette',name:'Chord Roulette',tag:'Guitar in hand',what:'Random chords on a steady beat. Build instant shape recall.',best:best('roulette:',v=>v+' bpm')},
   {href:'#game-strumback',name:'Strum It Back',tag:'Guitar in hand',what:'Hear a strum pattern, name it, then play it back.',best:best('strumback',v=>v+' / 10')},
   {href:'#game-ear',name:'Name That Chord',tag:'Ear training',what:'Hear a chord and pick its name.',best:best('ear:',v=>v+' / 10')}];
  $('#app').innerHTML=pageHead('Practice','Short drills that build real playing skills.')+
   `<div class="list">${items.map(g=>`<a class="game" href="${g.href}"><span class="meta"><span class="eyebrow">${g.tag}</span><span class="t">${g.name}</span><span class="muted" style="font-size:.9rem">${g.what}</span></span>
    <span class="gbest"><span class="eyebrow">Best</span><b>${g.best||'–'}</b></span></a>`).join('')}</div>`;
}

/* about and settings */
let installEvt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;const b=document.getElementById('installBtn');if(b)b.hidden=false});
const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function about(){
  stop();$('#player').hidden=true;setActiveTab('about');
  const played=Object.values(statuses).filter(v=>v==='got').length;
  $('#app').innerHTML=pageHead('Settings')+`
   <section class="card-sec"><h2 class="sh">Appearance</h2>
    <div class="seg" role="group" aria-label="Theme">${['auto','light','dark'].map(t=>`<button data-settheme="${t}" aria-pressed="${theme===t}">${t==='auto'?'Match device':t[0].toUpperCase()+t.slice(1)}</button>`).join('')}</div></section>
   <section class="card-sec"><h2 class="sh">Install</h2>
    ${isStandalone()?'<p class="muted">Installed. Open it from your home screen like any other app.</p>':`<p class="muted">Add ${APP_NAME} to your home screen to open it full screen, like a regular app. It also works offline once installed.</p>
    <button class="btn" id="installBtn" ${installEvt?'':'hidden'}>Install app</button>
    <p class="muted small">On iPhone or iPad: tap the Share button in Safari, then Add to Home Screen.</p>`}</section>
   <section class="card-sec"><h2 class="sh">Your progress</h2>
    <p class="muted">${played} song${played===1?'':'s'} marked Can play. Progress and best scores are saved on this device only.</p>
    <button class="btn ghost" id="resetBtn">Reset progress</button>
    <div id="resetConfirm" class="confirm" hidden><p>Clear song progress, recently played, and best scores? This cannot be undone.</p>
     <div class="pair"><button class="btn danger" id="resetYes">Reset</button><button class="btn ghost" id="resetNo">Cancel</button></div></div></section>
   <section class="card-sec about"><div class="about-id">${LOGO}<div><b>${APP_NAME}</b><span class="muted">Version ${APP_VERSION} · Guitar practice for the couch</span></div></div>
    <p class="muted small">The play-along is a single acoustic guitar, so it shows how the guitar part should feel rather than sounding like the full recording. Chord charts are simplified practice arrangements, not official transcriptions, and no lyrics are included.</p>
    <p class="muted small">Guitar samples from <a href="https://github.com/nbrosowsky/tonejs-instruments" target="_blank" rel="noopener">nbrosowsky/tonejs-instruments</a> (CC BY 3.0), trimmed and converted for this app. Not affiliated with any artist, label, or Rocksmith.</p>
    <p class="small"><a href="${REPO_URL}" target="_blank" rel="noopener">Source code and full credits on GitHub</a></p></section>`;
  document.querySelectorAll('[data-settheme]').forEach(b=>b.onclick=()=>{theme=b.dataset.settheme;store.set('ss-theme',theme);applyTheme();
    document.querySelectorAll('[data-settheme]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
  const ib=$('#installBtn');if(ib)ib.onclick=async()=>{if(!installEvt)return;installEvt.prompt();try{const r=await installEvt.userChoice;if(r.outcome==='accepted')toast('Installing '+APP_NAME)}catch(e){}installEvt=null;ib.hidden=true};
  $('#resetBtn').onclick=()=>{$('#resetConfirm').hidden=false;$('#resetBtn').hidden=true};
  $('#resetNo').onclick=()=>{$('#resetConfirm').hidden=true;$('#resetBtn').hidden=false};
  $('#resetYes').onclick=()=>{['ss-status','ss-recent','ss-arcade','ss-best2'].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});
    statuses={};recent=[];about();toast('Progress reset')};
}

/* offline support: only on a real website, not inside previews */
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')&&!/claude|anthropic/.test(location.hostname)){
  window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})})}
renderShell();
