/* ---------- arcade: games that build guitar skills ---------- */
const G={raf:0,timers:[],running:false};
function stopGames(){G.running=false;cancelAnimationFrame(G.raf);G.timers.forEach(t=>{clearTimeout(t);clearInterval(t)});G.timers=[];
  lastVoices.forEach(g=>{try{g.gain.setTargetAtTime(0,ac().currentTime,.03)}catch(e){}})}
const bestAll=()=>store.get('ss-arcade',{});
function setBest(k,v){const b=bestAll();if(b[k]===undefined||v>b[k]){b[k]=v;store.set('ss-arcade',b);return true}return false}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const arrows=p=>[...p].map(d=>SYM[d]);
function playShape(shape){const c=ac();if(c.state==='suspended')c.resume();strum(c.currentTime+.03,shape,0,'D',false)}
function header(eyebrow,title,blurb){return `<a class="back" href="#arcade">← Arcade</a><header style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2>${blurb?`<p class="muted">${blurb}</p>`:''}</header>`}
const LEVELS={open:{name:'Open chords',pool:['G','C','D','Em','Am','A','E']},
  sevenths:{name:'Plus sevenths',pool:['G','C','D','Em','Am','A','E','E7','A7','B7','D7','Cadd9','Dsus4']},
  barres:{name:'Plus barres',pool:['C','D','Em','Am','A','E','F','Bm','F#m','B','Bb','G#m']}};

function arcade(){
  stop();$('#player').hidden=true;const b=bestAll();
  const best=(prefix,fmt)=>{const v=Object.entries(b).filter(([k])=>k.startsWith(prefix)).map(([,v])=>v);return v.length?fmt(Math.max(...v)):'–'};
  const games=[
   {id:'roulette',name:'Chord Roulette',tag:'Fretting hand · guitar in hand',what:'Random chords on a steady click. Form each one before beat 1, then hear the reference strum and check that yours matches. Builds instant recall of shapes, like reading a chord chart on sight.',best:best('roulette:',v=>v+' bpm')},
   {id:'strumback',name:'Strum It Back',tag:'Rhythm by ear · guitar in hand',what:'Hear a one-bar strum pattern, pick which one it was, then loop it and play it back on your guitar. This is how you learn a song\'s strum from a recording.',best:best('strumback',v=>v+' / 10')},
   {id:'ear',name:'Name That Chord',tag:'Ear training',what:'Hear a chord and name it. Teaches you to hear major, minor, seventh, and barre chords, so you can catch your own wrong chords and work songs out by ear.',best:best('ear:',v=>v+' / 10')}];
  $('#app').innerHTML=`<header style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Practice games</p><h1>Arcade</h1>
   <p class="muted">Every game here trains a real playing skill. Two of them are played on your guitar, with the phone propped up in front of you. Best scores are saved on this device.</p></header>${nav('arcade')}
   <div class="list">${games.map(g=>`<a class="game" href="#game-${g.id}"><span class="meta"><span class="eyebrow">${g.tag}</span><span class="t">${g.name}</span><span class="muted" style="font-size:.9rem">${g.what}</span></span>
    <span class="gbest"><span class="eyebrow">Best</span><b>${g.best}</b></span></a>`).join('')}</div>`;
}

/* ----- Chord Roulette (play on the guitar, paced by the click) ----- */
const RL={level:'open',bpm:60,beats:4,showShape:true,ref:true,count:16};
function rouletteSetup(){
  stopGames();stop();$('#player').hidden=true;const b=bestAll(),key='roulette:'+RL.level+':'+RL.beats;
  $('#app').innerHTML=header('Fretting hand · guitar in hand','Chord Roulette','Prop your phone up and hold your guitar. The next chord is shown a bar early so you can get ready. Strum it on beat 1. The app strums the same chord on beat 1 so you can hear whether yours matches.')+`
   <div class="trainer">
    <div class="pair"><span class="eyebrow">Chords</span><div class="seg" role="group" aria-label="Chord set">${Object.entries(LEVELS).map(([k,v])=>`<button data-lv="${k}" aria-pressed="${RL.level===k}">${v.name}</button>`).join('')}</div></div>
    <p class="muted" style="font-size:.85rem">${LEVELS[RL.level].pool.join(', ')}</p>
    <div class="pair"><span class="eyebrow">New chord every</span><div class="seg" role="group" aria-label="Beats per chord">${[4,2].map(n=>`<button data-beats="${n}" aria-pressed="${RL.beats===n}">${n} beats</button>`).join('')}</div></div>
    <div class="pair"><span class="eyebrow">Tempo</span><div class="bpm"><button id="rDown" aria-label="Slower">−</button><output id="rBpm">${RL.bpm} bpm</output><button id="rUp" aria-label="Faster">+</button></div></div>
    <div class="toggles" style="flex-wrap:wrap"><label><input type="checkbox" id="rShape" ${RL.showShape?'checked':''}> Show chord diagrams</label><label><input type="checkbox" id="rRef" ${RL.ref?'checked':''}> Reference strum on beat 1</label></div>
    <p class="muted" style="font-size:.85rem">${RL.count} chords per round. Best clean tempo here: <b>${b[key]!==undefined?b[key]+' bpm':'not played yet'}</b>. Turn diagrams off once you know the shapes, so you practice recall instead of reading.</p>
    <button class="btn" id="rGo">Start</button>
   </div>`;
  document.querySelectorAll('[data-lv]').forEach(x=>x.onclick=()=>{RL.level=x.dataset.lv;rouletteSetup()});
  document.querySelectorAll('[data-beats]').forEach(x=>x.onclick=()=>{RL.beats=+x.dataset.beats;rouletteSetup()});
  const setB=v=>{RL.bpm=Math.max(40,Math.min(160,v));$('#rBpm').textContent=RL.bpm+' bpm'};
  $('#rDown').onclick=()=>setB(RL.bpm-5);$('#rUp').onclick=()=>setB(RL.bpm+5);
  $('#rShape').onchange=e=>RL.showShape=e.target.checked;$('#rRef').onchange=e=>RL.ref=e.target.checked;
  $('#rGo').onclick=roulettePlay;
}
function roulettePlay(){
  stopGames();const c=ac();if(c.state==='suspended')c.resume();loadSamples();wakeOn();G.running=true;
  const pool=LEVELS[RL.level].pool,seq=[];while(seq.length<RL.count){const n=pick(pool);if(n!==seq[seq.length-1])seq.push(n)}
  const beat=60/RL.bpm,t0=c.currentTime+.6,start=t0+4*beat,total=RL.count*RL.beats;
  $('#app').innerHTML=`<a class="back" href="#game-roulette">← Stop</a>
   <div class="hud"><div><span class="eyebrow">Chord</span><b id="rN">0 / ${RL.count}</b></div><div><span class="eyebrow">Tempo</span><b>${RL.bpm}</b></div></div>
   <div class="stage" id="rStage"><span class="eyebrow" id="rLabel">Get ready</span><span class="big" id="rNow" style="font-size:5rem">${seq[0]}</span>
    <div class="big-diag" id="rDiag" ${RL.showShape?'':'hidden'}>${diagram(SHAPES[seq[0]])}</div><div class="beats" id="rBeats">${'<span class="dot"></span>'.repeat(4)}</div></div>
   <div class="nextbox"><span class="eyebrow">Next</span><b id="rNext">${seq[1]}</b><span id="rNextDiag" ${RL.showShape?'':'hidden'}>${diagram(SHAPES[seq[1]])}</span></div>`;
  for(let i=0;i<4+total;i++){const t=t0+i*beat,k=i-4,isOne=k>=0&&k%RL.beats===0;
    click(t,i<4?i===0:isOne);
    if(isOne&&RL.ref)strum(t,SHAPES[seq[Math.floor(k/RL.beats)]],0,'D',false,.45);
    G.timers.push(setTimeout(()=>{
      document.querySelectorAll('#rBeats .dot').forEach((d,j)=>d.classList.toggle('on',j===(i<4?i:k%RL.beats)%4));
      if(i<4){$('#rLabel').textContent='Count-in '+(i+1);return}
      const ci=Math.floor(k/RL.beats);
      if(isOne){$('#rLabel').textContent='Strum now';$('#rNow').textContent=seq[ci];$('#rDiag').innerHTML=diagram(SHAPES[seq[ci]]);$('#rN').textContent=(ci+1)+' / '+RL.count;
        const nx=seq[ci+1];$('#rNext').textContent=nx||'Done';$('#rNextDiag').innerHTML=nx?diagram(SHAPES[nx]):'';
        $('#rStage').classList.remove('flash');void $('#rStage').offsetWidth;$('#rStage').classList.add('flash')}
      else $('#rLabel').textContent=(k%RL.beats===RL.beats-1&&seq[ci+1])?'Move to '+seq[ci+1]:'Keep strumming';
    },Math.max(0,(t-c.currentTime)*1000)))}
  G.timers.push(setTimeout(rouletteDone,(start+total*beat-c.currentTime)*1000+400));
}
function rouletteDone(){G.running=false;idleWake();
  const key='roulette:'+RL.level+':'+RL.beats;
  $('#app').innerHTML=`<a class="back" href="#game-roulette">← Chord Roulette</a>
   <div class="trainer" style="align-items:center;text-align:center"><p class="eyebrow">${LEVELS[RL.level].name} · every ${RL.beats} beats</p>
   <div class="big" style="font-size:3.5rem">${RL.count} chords</div><p>at ${RL.bpm} bpm. Did every chord ring clearly on beat 1?</p>
   <div class="pair" style="justify-content:center"><button class="btn" id="rClean">Yes, all clean</button><button class="btn ghost" id="rMessy">Some were late or buzzed</button></div>
   <div id="rMsg"></div></div>`;
  $('#rClean').onclick=()=>{const nb=setBest(key,RL.bpm);$('#rMsg').innerHTML=`<p>${nb?'New best clean tempo saved.':'Nice round.'} Next round, try ${RL.bpm+5} bpm${RL.showShape?', or turn the diagrams off':''}.</p><button class="btn" id="rUpGo" style="margin-top:10px">Play at ${RL.bpm+5} bpm</button>`;
    $('#rUpGo').onclick=()=>{RL.bpm+=5;roulettePlay()}};
  $('#rMessy').onclick=()=>{$('#rMsg').innerHTML=`<p>Note which chords tripped you up and drill those pairs in Chord changes. Or stay at ${RL.bpm} bpm and go again.</p><button class="btn" id="rAgain" style="margin-top:10px">Go again</button>`;
    $('#rAgain').onclick=roulettePlay};
}

/* ----- Strum It Back (rhythm ear training, then play it) ----- */
const PATTERNS=[{p:'D-D-D-D-',n:'Quarter-note downs'},{p:'DUDUDUDU',n:'Straight eighths'},{p:'D-DU-UDU',n:'Old faithful'},{p:'D-D-DUDU',n:'Driving'},
  {p:'D-DUD-DU',n:'Folk strum'},{p:'D---D-DU',n:'Sparse with a pickup'},{p:'--D---D-',n:'Reggae chop'},{p:'D-DUDUDU',n:'Busy'},
  {p:'D-D-D-DU',n:'Push at the end'},{p:'D--UD-DU',n:'Syncopated'},{p:'D-XU-UXU',n:'Chuck strum'},{p:'D-X-D-X-',n:'Simple chucks'},{p:'B-D-B-D-',n:'Boom-chick'}];
const SB2={round:0,score:0,ans:null,locked:false,bpm:72};
function patternLoop(p,shape,bpm,bars,{chop=false,show=null,countIn=true}={}){
  const c=ac();if(c.state==='suspended')c.resume();loadSamples();stopGames();G.running=true;
  const d=60/bpm/2,t0=c.currentTime+.4,lead=countIn?8:0;
  for(let i=0;i<lead+bars*8;i++){const t=t0+i*d,slot=i%8,live=i>=lead;
    if(slot%2===0)click(t,slot===0);
    if(live)stroke(t,shape,0,p[slot],{chop});
    if(show)G.timers.push(setTimeout(()=>show(live?slot:-1),Math.max(0,(t-c.currentTime)*1000)))}
  return t0+(lead+bars*8)*d-c.currentTime;
}
function strumbackSetup(){
  stopGames();stop();$('#player').hidden=true;const b=bestAll();
  $('#app').innerHTML=header('Rhythm by ear · guitar in hand','Strum It Back','Ten rounds. Listen to a strum pattern over a click, pick the one you heard, then play it back on your guitar with the loop. Listen for where the gaps fall and which strums sound lighter: those are the up strums.')+`
   <div class="trainer"><div class="pair"><span class="eyebrow">Tempo</span><div class="seg" role="group" aria-label="Tempo">${[60,72,90].map(v=>`<button data-bpm="${v}" aria-pressed="${SB2.bpm===v}">${v===60?'Slow':v===72?'Medium':'Quick'} ${v}</button>`).join('')}</div></div>
   <p class="muted" style="font-size:.85rem">Best: <b>${b.strumback!==undefined?b.strumback+' / 10':'not played yet'}</b>. The patterns come from the songs in your setlist.</p>
   <button class="btn" id="bGo">Start</button></div>`;
  document.querySelectorAll('[data-bpm]').forEach(x=>x.onclick=()=>{SB2.bpm=+x.dataset.bpm;strumbackSetup()});
  $('#bGo').onclick=()=>{SB2.round=0;SB2.score=0;sbRound()};
}
function sbRound(){
  SB2.round++;SB2.locked=false;const ans=pick(PATTERNS);SB2.ans=ans;
  const chord=pick(['G','C','D','Em','A','Am']),shape=SHAPES[chord];
  const opts=shuffle([ans,...shuffle(PATTERNS.filter(x=>x!==ans)).slice(0,3)]);
  $('#app').innerHTML=`<a class="back" href="#game-strumback">← Quit</a>
   <div class="hud"><div><span class="eyebrow">Round</span><b>${SB2.round} / 10</b></div><div><span class="eyebrow">Score</span><b>${SB2.score}</b></div><div><span class="eyebrow">Chord</span><b>${chord}</b></div></div>
   <div class="stage"><button class="listen" id="bHear" aria-label="Play the pattern again">▶</button><p class="muted" id="bMsg">Listen: one bar of clicks, then two bars of the pattern.</p></div>
   <div class="patopts">${opts.map((o,i)=>`<button class="ans pat" data-i="${i}"><span class="pa">${arrows(o.p).map(a=>`<i>${a}</i>`).join('')}</span><span class="cnt8">${['1','&','2','&','3','&','4','&'].map(n=>`<i>${n}</i>`).join('')}</span></button>`).join('')}</div>
   <div id="bAfter" hidden class="trainer"><p id="bVerdict"></p><p class="muted" style="font-size:.9rem">Now pick up your guitar and play it on ${chord}. The loop runs four bars after a one-bar count-in, and the arrows light up as you go.</p>
    <div class="pair"><button class="btn" id="bLoop">Loop it and play along</button><button class="btn ghost" id="bNext">${SB2.round>=10?'See results':'Next pattern'}</button></div></div>`;
  const hear=()=>patternLoop(ans.p,shape,SB2.bpm,2,{chop:ans.p==='--D---D-'});
  G.timers.push(setTimeout(hear,250));$('#bHear').onclick=hear;
  document.querySelectorAll('.pat').forEach(b=>b.onclick=()=>{
    const o=opts[+b.dataset.i];
    if(SB2.locked){patternLoop(o.p,shape,SB2.bpm,1,{countIn:false,chop:o.p==='--D---D-'});return}
    SB2.locked=true;const ok=o===ans;if(ok)SB2.score++;
    document.querySelectorAll('.pat').forEach(x=>{if(opts[+x.dataset.i]===ans)x.classList.add('right');else if(x===b)x.classList.add('wrong')});
    $('#bVerdict').innerHTML=(ok?'<strong>Yes.</strong> ':'<strong>Not quite.</strong> ')+`That was <strong>${ans.n}</strong>. ${ok?'':'Tap any pattern to hear it and compare.'}`;
    $('#bMsg').textContent='Tap a pattern to hear it.';$('#bAfter').hidden=false});
  $('#bLoop').onclick=()=>{const right=[...document.querySelectorAll('.pat')].find(x=>opts[+x.dataset.i]===ans),cells=right.querySelectorAll('.pa i');
    patternLoop(ans.p,shape,SB2.bpm,4,{chop:ans.p==='--D---D-',show:s=>cells.forEach((c,i)=>c.classList.toggle('hit',i===s))})};
  $('#bNext').onclick=()=>{stopGames();SB2.round>=10?sbDone():sbRound()};
}
function sbDone(){
  const nb=setBest('strumback',SB2.score);
  $('#app').innerHTML=`<a class="back" href="#game-strumback">← Strum It Back</a>
   <div class="trainer" style="align-items:center;text-align:center"><p class="eyebrow">${SB2.bpm} bpm</p>
   <div class="big" style="font-size:4rem">${SB2.score} / 10</div><p class="muted">${nb?'New best':''}</p>
   <p>${SB2.score>=9?'You can hear strum patterns well. Try the Quick tempo, then try working out a strum from a real recording.':SB2.score>=6?'Good. Most mix-ups come from where the up strums fall. Count along out loud while you listen.':'Try Slow tempo and count "one and two and" out loud while it plays.'}</p>
   <button class="btn" id="bAgain">Play again</button></div>`;
  $('#bAgain').onclick=()=>{SB2.round=0;SB2.score=0;sbRound()};
}

/* ----- Name That Chord ----- */
const EAR={level:'open',round:0,score:0,locked:false};
function earSetup(){
  stopGames();stop();$('#player').hidden=true;const b=bestAll();
  $('#app').innerHTML=header('Ear training','Name That Chord','Ten rounds. Listen, then pick the chord. After you answer, tap any choice to hear it and compare.')+`
   <div class="trainer"><div class="pair"><span class="eyebrow">Level</span><div class="seg" role="group" aria-label="Level">${Object.entries(LEVELS).map(([k,v])=>`<button data-lv="${k}" aria-pressed="${EAR.level===k}">${v.name}</button>`).join('')}</div></div>
   <p class="muted" style="font-size:.9rem">Chords in this level: ${LEVELS[EAR.level].pool.join(', ')}. Best: <b>${b['ear:'+EAR.level]!==undefined?b['ear:'+EAR.level]+' / 10':'not played yet'}</b></p>
   <p class="muted" style="font-size:.85rem">Major chords sound bright and settled, minor chords sound darker, and seventh chords sound like they want to move somewhere. Bonus: play each answer on your guitar and check it matches.</p>
   <button class="btn" id="eGo">Start</button></div>`;
  document.querySelectorAll('[data-lv]').forEach(x=>x.onclick=()=>{EAR.level=x.dataset.lv;earSetup()});
  $('#eGo').onclick=()=>{loadSamples();EAR.round=0;EAR.score=0;earRound()};
}
function earRound(){
  const pool=LEVELS[EAR.level].pool;EAR.round++;EAR.locked=false;
  const ans=pick(pool);const opts=shuffle([ans,...shuffle(pool.filter(c=>c!==ans)).slice(0,3)]);
  $('#app').innerHTML=`<a class="back" href="#game-ear">← Quit</a>
   <div class="hud"><div><span class="eyebrow">Round</span><b>${EAR.round} / 10</b></div><div><span class="eyebrow">Score</span><b>${EAR.score}</b></div></div>
   <div class="stage"><button class="listen" id="eHear" aria-label="Play the chord again">▶</button><p class="muted" id="eMsg">Which chord is this?</p></div>
   <div class="answers">${opts.map(o=>`<button class="ans" data-a="${o}">${o}</button>`).join('')}</div>
   <button class="btn" id="eNext" hidden>${EAR.round>=10?'See results':'Next chord'}</button>`;
  const hear=()=>playShape(SHAPES[ans]);
  G.timers.push(setTimeout(hear,250));$('#eHear').onclick=hear;
  document.querySelectorAll('.ans').forEach(b=>b.onclick=()=>{
    if(EAR.locked){playShape(SHAPES[b.dataset.a]);return}
    EAR.locked=true;const ok=b.dataset.a===ans;if(ok)EAR.score++;
    document.querySelectorAll('.ans').forEach(x=>{if(x.dataset.a===ans)x.classList.add('right');else if(x===b)x.classList.add('wrong')});
    $('#eMsg').textContent=ok?'Yes, that was '+ans+'.':'That was '+ans+'. Tap the choices to hear the difference.';
    $('#eNext').hidden=false});
  $('#eNext').onclick=()=>EAR.round>=10?earDone():earRound();
}
function earDone(){
  const isBest=setBest('ear:'+EAR.level,EAR.score);
  $('#app').innerHTML=`<a class="back" href="#game-ear">← Name That Chord</a>
   <div class="trainer" style="align-items:center;text-align:center"><p class="eyebrow">${LEVELS[EAR.level].name}</p>
   <div class="big" style="font-size:4rem">${EAR.score} / 10</div><p class="muted">${isBest?'New best for this level':''}</p>
   <p>${EAR.score>=9?'Great ears. Try the next level up.':EAR.score>=6?'Good. Most mix-ups are major versus minor, so listen for bright versus dark.':'Keep at it. Play each chord in the level on your guitar a few times and say its name out loud.'}</p>
   <button class="btn" id="eAgain">Play again</button></div>`;
  $('#eAgain').onclick=()=>{EAR.round=0;EAR.score=0;earRound()};
}
