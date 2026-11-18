/* ---------- chord change trainer (hands-free, paced by the click) ---------- */
const ALL=Object.keys(SHAPES);
const TR={a:'G',b:'Em',bpm:60,beats:4,running:false,timer:null,raf:0,next:0,beat:0,queue:[],total:0,changes:0,startAt:0};
function changes(){
  stop();trStop(true);$('#player').hidden=true;
  const suggestions=[['G','C'],['G','Em'],['D','A'],['Em','C'],['A','E'],['Em7','G'],['Cadd9','Dsus4'],['D','Cadd9'],['C','Fmaj7'],['C','F mini'],['Am','F'],['F','G'],['E','F#m mini'],['A','F#m'],['D','F#m'],['E7','A7'],['A7','B7'],['A','Bm'],['F','Bb'],['B','F#'],['G#m','E']];
  $('#app').innerHTML=`${pageHead('Chord changes','Set your phone down and play. One minute, counted for you.',['#practice','Practice'])}${nav('changes')}
  <div class="trainer">
   <div class="pair"><select id="ca" aria-label="First chord">${ALL.map(c=>`<option ${c===TR.a?'selected':''}>${c}</option>`).join('')}</select>
    <span class="muted">and</span><select id="cb" aria-label="Second chord">${ALL.map(c=>`<option ${c===TR.b?'selected':''}>${c}</option>`).join('')}</select></div>
   <div class="pair"><span class="eyebrow">Switch every</span>
    <div class="seg" role="group" aria-label="Beats per chord">${[4,2,1].map(n=>`<button data-beats="${n}" aria-pressed="${n===TR.beats}">${n} beat${n>1?'s':''}</button>`).join('')}</div></div>
   <div class="pair"><span class="eyebrow">Tempo</span><div class="bpm"><button id="tDown" aria-label="Slower">−</button><output id="tBpm">${TR.bpm} bpm</output><button id="tUp" aria-label="Faster">+</button></div>
    <label class="muted" style="font-size:.85rem;display:flex;gap:5px;align-items:center"><input type="checkbox" id="tSound"> Play the chord too</label></div>
   <div class="stage" id="stage">
    <div class="stage-now"><span class="eyebrow" id="sLabel">Ready</span><span class="big" id="sChord">${TR.a}</span><span class="muted" id="sNext">then ${TR.b}</span></div>
    <div class="beats" id="sBeats"></div>
    <div class="scores"><div><span class="eyebrow">Time left</span><div class="mid" id="tLeft">60</div></div>
     <div><span class="eyebrow">Changes</span><div class="mid" id="tCount">0</div></div>
     <div><span class="eyebrow">Best clean</span><div class="mid" id="tBest">–</div></div></div>
   </div>
   <div id="result" class="result" hidden></div>
   <div class="pair"><button class="btn" id="tStart">Start 1 minute</button><button class="btn ghost" id="tStop" hidden>Stop</button></div>
  </div>
  <section class="sec"><h3>Pairs from your songs</h3><div class="pills">${suggestions.map(p=>`<button class="pill" style="border:none;font-size:.9rem;padding:6px 10px" data-p="${p.join('|')}">${p[0]} ↔ ${p[1]}</button>`).join('')}</div>
  <p class="muted" style="font-size:.88rem">Start with a switch every 4 beats. When a full minute feels clean, try 2 beats, then 1. After that, add 5 bpm at a time.</p></section>`;
  trPaint();
  $('#ca').onchange=e=>{TR.a=e.target.value;trPaint()};$('#cb').onchange=e=>{TR.b=e.target.value;trPaint()};
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{[TR.a,TR.b]=b.dataset.p.split('|');$('#ca').value=TR.a;$('#cb').value=TR.b;trPaint()});
  document.querySelectorAll('[data-beats]').forEach(b=>b.onclick=()=>{TR.beats=+b.dataset.beats;document.querySelectorAll('[data-beats]').forEach(x=>x.setAttribute('aria-pressed',x===b));trPaint()});
  const setT=v=>{TR.bpm=Math.max(40,Math.min(200,v));$('#tBpm').textContent=TR.bpm+' bpm'};
  $('#tDown').onclick=()=>setT(TR.bpm-5);$('#tUp').onclick=()=>setT(TR.bpm+5);
  $('#tStart').onclick=trStart;$('#tStop').onclick=()=>trStop(false);
}
function trKey(){return TR.a+'|'+TR.b+'|'+TR.beats}
function trPaint(){
  $('#sChord').textContent=TR.a;$('#sNext').textContent='then '+TR.b;$('#sLabel').textContent='Ready';
  $('#sBeats').innerHTML=Array.from({length:4},(_,i)=>`<span class="dot" data-i="${i}"></span>`).join('');
  const b=store.get('ss-best2',{})[trKey()];$('#tBest').textContent=b?b.bpm+' bpm':'–';
}
function trStart(){
  const c=ac();if(c.state==='suspended')c.resume();
  $('#result').hidden=true;TR.running=true;TR.beat=0;TR.changes=0;TR.queue=[];
  TR.next=c.currentTime+.1;TR.startAt=TR.next+4*60/TR.bpm;TR.total=Math.floor(TR.bpm)+4;
  $('#tStart').hidden=true;$('#tStop').hidden=false;wakeOn();$('#tCount').textContent='0';$('#tLeft').textContent='60';
  TR.timer=setInterval(trTick,25);trTick();cancelAnimationFrame(TR.raf);trDraw();
}
function trTick(){const c=ac(),dur=60/TR.bpm;
  while(TR.running&&TR.next<c.currentTime+.12&&TR.beat<TR.total){
    const b=TR.beat,count=b<4,k=b-4;
    const idx=count?0:Math.floor(k/TR.beats)%2,isChange=!count&&k>0&&k%TR.beats===0;
    click(TR.next,count?b===0:k%TR.beats===0);
    if(!count&&$('#tSound').checked&&k%TR.beats===0)strum(TR.next,SHAPES[idx?TR.b:TR.a],0,'D',false);
    TR.queue.push({t:TR.next,b,count,idx,isChange});TR.next+=dur;TR.beat++}
  if(TR.beat>=TR.total&&TR.queue.length===0)trFinish();
}
function trDraw(){const c=ac();
  while(TR.queue.length&&TR.queue[0].t<=c.currentTime){const it=TR.queue.shift();
    document.querySelectorAll('#sBeats .dot').forEach((d,i)=>d.classList.toggle('on',i===it.b%4));
    if(it.count){$('#sLabel').textContent='Count-in';$('#sChord').textContent=String(it.b+1);$('#sNext').textContent='first: '+TR.a}
    else{const cur=it.idx?TR.b:TR.a,nxt=it.idx?TR.a:TR.b;$('#sLabel').textContent='Play';$('#sChord').textContent=cur;$('#sNext').textContent='next: '+nxt;
      if(it.isChange){TR.changes++;$('#tCount').textContent=TR.changes;$('#stage').classList.remove('flash');void $('#stage').offsetWidth;$('#stage').classList.add('flash')}
      $('#tLeft').textContent=Math.max(0,Math.ceil(60-(it.t-TR.startAt)-60/TR.bpm))}}
  if(TR.running)TR.raf=requestAnimationFrame(trDraw);
}
function trStop(silent){clearInterval(TR.timer);cancelAnimationFrame(TR.raf);TR.running=false;idleWake();
  if(silent)return;$('#tStart').hidden=false;$('#tStop').hidden=true;trPaint();$('#tCount').textContent=TR.changes}
function trFinish(){trStop(true);$('#tStart').hidden=false;$('#tStop').hidden=true;$('#tLeft').textContent='0';
  const r=$('#result');r.hidden=false;
  r.innerHTML=`<p><strong>${TR.changes} changes at ${TR.bpm} bpm.</strong> How did they sound?</p>
   <div class="pair"><button class="btn" id="rClean">Clean, every chord rang</button><button class="btn ghost" id="rMessy">Some buzzed or were late</button></div>`;
  $('#rClean').onclick=()=>{const all=store.get('ss-best2',{}),k=trKey();if(!all[k]||TR.bpm>all[k].bpm){all[k]={bpm:TR.bpm,changes:TR.changes};store.set('ss-best2',all);toast('New best: '+TR.bpm+' bpm')}
    trPaint();r.innerHTML=`<p>Nice. Saved as your best for this pair. Next round, try ${TR.beats>1?'switching every '+(TR.beats/2)+' beat'+(TR.beats/2>1?'s':'')+' at the same tempo':TR.bpm+5+' bpm'}.</p>`};
  $('#rMessy').onclick=()=>{r.innerHTML=`<p>Stay at ${TR.bpm} bpm${TR.bpm>45?' or drop to '+(TR.bpm-5):''} and run it again. Clean and slow beats fast and sloppy.</p>`};
}
