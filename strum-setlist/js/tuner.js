/* ---------- tuner (reference notes, tune by ear) ---------- */
const STRINGS=[{n:'E',num:6,note:'E2',name:'Low E'},{n:'A',num:5,note:'A2',name:'A'},{n:'D',num:4,note:'D3',name:'D'},
  {n:'G',num:3,note:'G3',name:'G'},{n:'B',num:2,note:'B3',name:'B'},{n:'e',num:1,note:'E4',name:'High E'}];
const TN={cur:null,timer:null,osc:[],g:null,mode:store.get('ss-tunemode','pluck')};
function tunerSilence(){clearInterval(TN.timer);TN.timer=null;const c=ac();
  if(TN.g){try{TN.g.gain.setTargetAtTime(0,c.currentTime,.05)}catch(e){}}TN.osc.forEach(o=>{try{o.stop(c.currentTime+.4)}catch(e){}});TN.osc=[];TN.g=null;
  lastVoices.forEach(g=>{try{g.gain.setTargetAtTime(0,c.currentTime,.05)}catch(e){}})}
function tunerStop(){tunerSilence();TN.cur=null;tunerPaint()}
function tunerPlay(i){
  if(TN.cur===i){tunerStop();return}
  tunerSilence();TN.cur=i;const c=ac();if(c.state==='suspended')c.resume();loadSamples();
  if(TN.mode==='pluck'){const sh=[...'xxxxxx'];sh[i]='0';const shape=sh.join('');
    const go=()=>strum(ac().currentTime+.03,shape,0,'D',false,1.7);go();TN.timer=setInterval(go,2400)}
  else{const g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.16,c.currentTime+.08);g.connect(c.destination);TN.g=g;
    [[1,'triangle',1],[2,'sine',.35],[3,'sine',.12]].forEach(([m,type,v])=>{const o=c.createOscillator(),og=c.createGain();o.type=type;o.frequency.value=STD[i]*m;og.gain.value=v;o.connect(og).connect(g);o.start();TN.osc.push(o)})}
  tunerPaint()}
function tunerPaint(){document.querySelectorAll('[data-str]').forEach(b=>{const on=+b.dataset.str===TN.cur;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  const cur=TN.cur===null?null:STRINGS[TN.cur];
  $('#tnNow').innerHTML=cur?`Playing string ${cur.num}, <b>${cur.name}</b> (${cur.note}). Tap it again to stop.`:'Tap a string to hear its note on repeat.'}
function tuner(){
  stop();$('#player').hidden=true;
  $('#app').innerHTML=`<header style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Standard tuning · E A D G B E</p><h1>Tuner</h1></header>${nav('tuner')}
   <div class="trainer">
    <div class="strings" role="group" aria-label="Strings, thickest to thinnest">${STRINGS.map((s,i)=>`<button class="strbtn" data-str="${i}" aria-pressed="false"><b>${s.n}</b><small>${s.num}</small></button>`).join('')}</div>
    <p class="muted" id="tnNow" aria-live="polite"></p>
    <div class="pair"><span class="eyebrow">Sound</span><div class="seg" role="group" aria-label="Reference sound">
      <button data-tmode="pluck" aria-pressed="${TN.mode==='pluck'}">Guitar pluck</button><button data-tmode="tone" aria-pressed="${TN.mode==='tone'}">Steady tone</button></div></div>
    <div class="pair"><button class="btn ghost" id="tnAll">Play all six</button><button class="btn ghost" id="tnChord">Check with an E chord</button></div>
   </div>
   <section class="sec"><h3>How to tune by ear</h3>
    <ol class="steps"><li>Tap a string above. Its note repeats until you tap it again.</li>
     <li>Pluck the same string on your guitar and turn its peg slowly.</li>
     <li>Listen for a wobble between the two notes. The wobble slows down as you get close and stops when they match.</li>
     <li>Not sure if you are too high or too low? Loosen the string a little below the note, then tighten up to it.</li></ol>
    <p class="muted" style="font-size:.88rem">The steady tone makes the wobble easier to hear. This page cannot use your phone's microphone, so it cannot read your tuning for you. For a needle-style readout, use a clip-on tuner or a free tuner app alongside this.</p></section>`;
  tunerPaint();
  document.querySelectorAll('[data-str]').forEach(b=>b.onclick=()=>tunerPlay(+b.dataset.str));
  document.querySelectorAll('[data-tmode]').forEach(b=>b.onclick=()=>{TN.mode=b.dataset.tmode;store.set('ss-tunemode',TN.mode);
    document.querySelectorAll('[data-tmode]').forEach(x=>x.setAttribute('aria-pressed',x===b));const was=TN.cur;if(was!==null){TN.cur=null;tunerPlay(was)}});
  $('#tnAll').onclick=()=>{tunerStop();const c=ac();if(c.state==='suspended')c.resume();loadSamples();
    STRINGS.forEach((s,i)=>{const sh=[...'xxxxxx'];sh[i]='0';const t=c.currentTime+.05+i*.9;
      G.timers.push(setTimeout(()=>{document.querySelectorAll('[data-str]').forEach(b=>b.classList.toggle('on',+b.dataset.str===i))},(t-c.currentTime)*1000));
      setTimeout(()=>strum(ac().currentTime+.02,sh.join(''),0,'D',false,1.7),(t-c.currentTime)*1000)});
    G.timers.push(setTimeout(()=>tunerPaint(),6*900+800))};
  $('#tnChord').onclick=()=>{tunerStop();playShape(SHAPES.E)};
}
