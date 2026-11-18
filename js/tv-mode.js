/* ---------- TV mode: scrolling chord highway ---------- */
const TV={open:false,raf:0,px:40,hitX:0,L:0,anchor:null,pending:false};
function nextChange(bi,slot){const fl=P.flat;let cur=chordAt(fl[bi],slot),b=bi,sl=slot,n=0;
  for(let k=0;k<64;k++){sl++;if(sl>7){sl=0;b=(b+1)%fl.length}n++;const c=chordAt(fl[b],sl);if(c!==cur)return {c,beats:Math.ceil(n/2)}}return null}
function tvBuild(){if(!TV.open)return;const s=P.song,fl=P.flat,L=fl.length*8;TV.L=L;
  const W=$('#tvHwy').clientWidth||1200;TV.hitX=Math.round(W*.14);TV.px=Math.max(14,(W-TV.hitX)/32);const px=TV.px;
  let ch='',st='',bl='';
  for(let copy=0;copy<2;copy++){const off=copy*L;let run=null,rs=0;
    const flush=end=>{if(run!==null)ch+=`<div class="tvc" style="left:${rs*px}px;width:${Math.max(8,(end-rs)*px-6)}px"><b>${run}</b></div>`};
    fl.forEach((bar,bi)=>{const g0=off+bi*8,sec=s.sections[bar.si];
      bl+=`<span class="tvbl${bar.bi===0?' sec':''}" style="left:${g0*px}px">${bar.bi===0?sec.name:''}</span>`;
      for(let sl=0;sl<8;sl++){const g=g0+sl,c=chordAt(bar,sl);if(c!==run){flush(g);run=c;rs=g}
        const d=bar.pat[sl];if(d!=='-')st+=`<span class="tvs ${clsOf(d)}" style="left:${g*px}px">${symOf(d)}</span>`}});
    flush(off+L)}
  $('#tvTrack').innerHTML=`<div class="tvl-bars">${bl}</div><div class="tvl-c">${ch}</div><div class="tvl-s">${st}</div>`;
}
function tvPos(){if(!P.playing||!TV.anchor)return 0;return TV.anchor.g+(ac().currentTime-TV.anchor.t)/(60/P.bpm/2)}
function tvFrame(){if(!TV.open)return;let p=tvPos();if(p>=0)p=p%TV.L;
  $('#tvTrack').style.transform=`translateX(${TV.hitX-p*TV.px}px)`;
  const fl=Math.max(0,tvPos())%TV.L/TV.L;$('#tvProg').style.width=(fl*100).toFixed(2)+'%';
  TV.raf=requestAnimationFrame(tvFrame)}
function tvSide(chord,bi,slot){$('#tvNow').textContent=chord;const sh=shapeOf(P.song,chord);$('#tvDiag').innerHTML=sh?diagram(sh):'';
  const nm=shapeName(P.song,chord);$('#tvShape').textContent=nm!==chord?nm:'';
  const n=nextChange(bi,slot);if(n){$('#tvNext').textContent=n.c;$('#tvNDiag').innerHTML=diagram(shapeOf(P.song,n.c));$('#tvIn').textContent=n.beats<=8?'in '+n.beats+(n.beats===1?' beat':' beats'):''}
  else{$('#tvNext').textContent='Same';$('#tvNDiag').innerHTML='';$('#tvIn').textContent=''}}
function tvSection(si,bi){const sec=P.song.sections[si],tags=feelTag(sec,P.song);
  $('#tvSec').textContent=sec.name+(tags.length?' · '+tags.join(' · '):'');$('#tvBar').textContent='Bar '+(bi+1)+' of '+sec.bars.length}
function tvReset(){if(!TV.open)return;flatten();TV.anchor=null;tvBuild();const f=P.flat[0];
  $('#tvCount').hidden=true;tvSide(f.chords[0],0,0);tvSection(f.si,f.bi);$('#tvBpm').textContent=P.bpm;
  $('#tvPlay').textContent=P.playing?'■ Stop':'▶ Play';$('#tvLoop').value=P.loop===null?'all':String(P.loop)}
function tvShow(it){if(!TV.open)return;TV.anchor={g:it.step-8,t:it.t};
  if(it.count){const n=Math.floor(it.slot/2)+1;$('#tvCount').hidden=false;$('#tvCount').textContent=n;
    const f=P.flat[0];$('#tvNext').textContent=f.chords[0];$('#tvNDiag').innerHTML=diagram(shapeOf(P.song,f.chords[0]));$('#tvIn').textContent='first chord';return}
  $('#tvCount').hidden=true;const bar=P.flat[it.bi];
  if($('#tvNow').textContent!==it.chord||it.slot===0)tvSide(it.chord,it.bi,it.slot);else{const n=nextChange(it.bi,it.slot);$('#tvIn').textContent=n&&n.beats<=8?'in '+n.beats+(n.beats===1?' beat':' beats'):''}
  if(it.slot===0)tvSection(bar.si,bar.bi);
  if(bar.pat[it.slot]!=='-'){const h=$('#tvHit');h.classList.remove('pulse');void h.offsetWidth;h.classList.add('pulse')}}
function tvOpen(){const s=P.song;if(!s)return;hearStop();pvClose();TV.open=true;
  $('#tvSong').textContent=s.title;$('#tvArtist').textContent=s.artist+(s.capo?' · capo '+s.capo:' · no capo');
  $('#tvLoop').innerHTML=`<option value="all">Whole song</option>`+s.sections.map((x,i)=>`<option value="${i}">${x.name}</option>`).join('');
  $('#tv').hidden=false;document.body.classList.add('pv-lock');applyTheme();wakeOn();
  requestAnimationFrame(()=>{tvReset();cancelAnimationFrame(TV.raf);tvFrame();$('#tvPlay').focus()})}
function tvClose(){if(!TV.open)return;TV.open=false;cancelAnimationFrame(TV.raf);$('#tv').hidden=true;document.body.classList.remove('pv-lock');wakeOff();
  try{if(document.fullscreenElement)document.exitFullscreen()}catch(e){}}
function tvLoopStep(d){const n=P.song.sections.length,opts=[null,...P.song.sections.map((_,i)=>i)];let i=opts.indexOf(P.loop);i=(i+d+opts.length)%opts.length;
  P.loop=opts[i];PV.lastSi=-1;updateLoop();if(P.playing){stop();start()}else resetNow()}
function tvFull(){try{if(document.fullscreenElement)document.exitFullscreen();else{const r=$('#tv').requestFullscreen&&$('#tv').requestFullscreen();if(r&&r.catch)r.catch(()=>{})}}catch(e){}}
$('#tvPlay').onclick=()=>{hearStop();P.playing?stop():start()};
$('#tvDown').onclick=()=>setBpm(P.bpm-5);$('#tvUp').onclick=()=>setBpm(P.bpm+5);
$('#tvExit').onclick=tvClose;$('#tvFull').onclick=tvFull;
$('#tvLoop').onchange=e=>{P.loop=e.target.value==='all'?null:+e.target.value;updateLoop();if(P.playing){stop();start()}else resetNow()};
window.addEventListener('keydown',e=>{if(!TV.open)return;const k=e.key;
  if(e.target&&e.target.tagName==='SELECT'&&(k==='ArrowUp'||k==='ArrowDown'))return;
  if(k===' '||k==='Enter'||k==='MediaPlayPause'){if(k==='Enter'&&e.target&&e.target.tagName==='BUTTON'&&e.target!==$('#tvPlay'))return;e.preventDefault();hearStop();P.playing?stop():start()}
  else if(k==='ArrowLeft'){e.preventDefault();setBpm(P.bpm-5)}else if(k==='ArrowRight'){e.preventDefault();setBpm(P.bpm+5)}
  else if(k==='ArrowUp'){e.preventDefault();tvLoopStep(-1)}else if(k==='ArrowDown'){e.preventDefault();tvLoopStep(1)}
  else if(k==='f'||k==='F'){tvFull()}else if(k==='Escape'||k==='Backspace'||k==='BrowserBack'){if(!document.fullscreenElement){e.preventDefault();tvClose()}}},true);
window.addEventListener('resize',()=>{if(TV.open)tvBuild()});

/* ---------- TV song picker ---------- */
function tvPicker(){
  stop();$('#player').hidden=true;
  const list=SONGS.filter(passes);
  $('#app').innerHTML=`<header style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Big screen</p><h1>TV mode</h1>
   <p class="muted">Chords scroll toward a line like Rocksmith, with the strum arrows underneath and the current and next chord shapes on the side. Pick a song to start.</p></header>${nav('tv')}
   ${filterRow()}
   <details class="howto" open><summary>How to get it on your TV</summary>
    <ul class="steps">
     <li><b>Laptop with Chrome:</b> open this page, then in the Chrome menu (⋮) choose Cast and pick your TV. Or plug the laptop into the TV with an HDMI cable.</li>
     <li><b>iPhone or iPad:</b> open Control Center, tap Screen Mirroring, and pick your Apple TV or AirPlay TV. Turn the phone sideways.</li>
     <li><b>Android phone:</b> use Cast or Smart View from the quick settings and pick your TV. Turn the phone sideways.</li>
     <li><b>TV web browser:</b> open the link and sign in to Claude, since this page is private to you.</li>
    </ul>
    <p class="muted" style="font-size:.9rem">Controls: Space or OK to play and stop, Left and Right for tempo, Up and Down to loop a section, F for full screen, Esc to exit. A Bluetooth keyboard or your laptop keys work, and many TV remotes send these keys in a TV browser. If the picture lags, turn on your TV's game mode.</p>
   </details>
   <div class="tvgrid" id="tvGrid">${list.length?list.map(s=>`<button class="tvpick" data-tvsong="${s.id}"><span class="eyebrow">Chapter ${s.chapter} · ${s.artist}</span><b>${s.title}</b><span>${badge(s)} <span class="muted">${s.capo?'capo '+s.capo:'no capo'}</span></span></button>`).join(''):'<p class="muted">No songs match these filters.</p>'}</div>`;
  bindFilters(tvPicker);
  document.querySelectorAll('[data-tvsong]').forEach(b=>b.onclick=()=>{TV.pending=true;location.hash='song-'+b.dataset.tvsong});
  setTimeout(()=>{const first=document.querySelector('.tvpick');if(first&&location.hash==='#tv')first.focus({preventScroll:true})},50);
  $('#app').classList.add('wide');
}
window.addEventListener('keydown',e=>{if(TV.open||location.hash!=='#tv')return;const items=[...document.querySelectorAll('.tvpick')];if(!items.length)return;const i=items.indexOf(document.activeElement);if(i<0){if(/^Arrow/.test(e.key)){e.preventDefault();items[0].focus();items[0].scrollIntoView({block:'nearest'})}return}
  const top=items[0].offsetTop;let cols=items.findIndex(x=>x.offsetTop!==top);if(cols<1)cols=items.length;
  const d={ArrowRight:1,ArrowLeft:-1,ArrowDown:cols,ArrowUp:-cols}[e.key];if(d===undefined)return;e.preventDefault();
  const j=Math.max(0,Math.min(items.length-1,i+d));items[j].focus();items[j].scrollIntoView({block:'nearest'})});
