/* ---------- player ---------- */
const P={song:null,bpm:80,playing:false,loop:null,flat:[],timer:null,next:0,step:0,queue:[],raf:0};
function flatten(){const s=P.song,out=[];s.sections.forEach((sec,si)=>{if(P.loop!==null&&P.loop!==si)return;
  for(let r=0;r<sec.repeat;r++)sec.bars.forEach((b,bi)=>{const k=r*sec.bars.length+bi;
    out.push({si,bi,chords:b,pat:barPat(s,si,k,bi===sec.bars.length-1),vol:sec.vol||1})})});P.flat=out}
function chordAt(bar,slot){return bar.chords[Math.floor(slot/(8/bar.chords.length))]}
function tick(){const c=ac();const dur=60/P.bpm/2;
  while(P.next<c.currentTime+.12){
    const step=P.step,count=step<8,slot=step%8;
    if(slot%2===0&&$('#optClick').checked)click(P.next,slot===0);
    let item={t:P.next,slot,count,step};
    if(!count){const bi=Math.floor((step-8)/8)%P.flat.length,bar=P.flat[bi],ch=chordAt(bar,slot),d=bar.pat[slot];
      item.bi=bi;item.chord=ch;
      if(d!=='-'&&$('#optStrum').checked)stroke(feel(P.next,slot),shapeOf(P.song,ch),P.song.capo,d,{chop:P.song.chop,pm:pmAt(P.song,bar.si),vol:bar.vol*ACC[slot]})}
    P.queue.push(item);P.next+=dur;P.step++}}
function draw(){const c=ac();while(P.queue.length&&P.queue[0].t<=c.currentTime){const it=P.queue.shift();show(it)}P.raf=requestAnimationFrame(draw)}
let shownPat=null;
function renderStrumRow(pat){shownPat=pat;$('#strumRow').innerHTML=[...pat].map((d,i)=>`<div class="slot ${isSoft(d)?'soft':''}">${symOf(d)}<small>${CNT[i]}</small></div>`).join('')}
function showMain(it){
  document.querySelectorAll('.bar.cur').forEach(e=>e.classList.remove('cur'));
  document.querySelectorAll('.mini i.hit').forEach(e=>e.classList.remove('hit'));
  if(it.count){if(shownPat!==P.flat[0].pat)renderStrumRow(P.flat[0].pat);
    document.querySelectorAll('.slot.hit').forEach(e=>e.classList.remove('hit'));
    $('#nowC').textContent=String(Math.floor(it.slot/2)+1);$('#nextC').textContent='count-in';return}
  const bar=P.flat[it.bi];if(shownPat!==bar.pat)renderStrumRow(bar.pat);
  document.querySelectorAll('.slot').forEach((el,i)=>el.classList.toggle('hit',i===it.slot&&bar.pat[i]!=='-'));
  const el=document.querySelector(`.bar[data-s="${bar.si}"][data-b="${bar.bi}"]`);
  if(el){el.classList.add('cur');const m=el.querySelectorAll('.mini i')[it.slot];if(m&&bar.pat[it.slot]!=='-')m.classList.add('hit')}
  $('#nowC').textContent=it.chord;
  const sameBarNext=bar.chords.indexOf(it.chord)<bar.chords.length-1?bar.chords[bar.chords.indexOf(it.chord)+1]:P.flat[(it.bi+1)%P.flat.length].chords[0];
  $('#nextC').textContent='next: '+sameBarNext;
  document.querySelectorAll('.chord').forEach(e=>e.classList.toggle('on',e.dataset.c===it.chord))}
function show(it){showMain(it);pvShow(it);tvShow(it)}
function start(){const c=ac();if(c.state==='suspended')c.resume();flatten();P.queue=[];P.step=0;P.next=c.currentTime+.08;P.playing=true;
  P.timer=setInterval(tick,25);tick();cancelAnimationFrame(P.raf);draw();$('#playBtn').textContent='■';$('#playBtn').setAttribute('aria-label','Stop');if(PV.open){$('#pvPlay').textContent='■';$('#pvPlay').setAttribute('aria-label','Stop')}if(TV.open)$('#tvPlay').textContent='■ Stop';wakeOn()}
function stop(){P.playing=false;idleWake();clearInterval(P.timer);cancelAnimationFrame(P.raf);lastVoices.forEach(g=>{try{g.gain.setTargetAtTime(0,ac().currentTime,.03)}catch(e){}});
  document.querySelectorAll('.slot.hit,.bar.cur,.chord.on,.mini i.hit').forEach(e=>e.classList.remove('hit','cur','on'));
  $('#playBtn').textContent='▶';$('#playBtn').setAttribute('aria-label','Play');if(P.song)resetNow()}
function resetNow(){flatten();const f=P.flat[0];renderStrumRow(f.pat);pvReset();tvReset();$('#nowC').textContent=f.chords[0];$('#nextC').textContent='next: '+(f.chords[1]||(P.flat[1]||f).chords[0])}
function setBpm(v){P.bpm=Math.max(40,Math.min(200,v));$('#bpmOut').textContent=P.bpm+' bpm';const o=$('#pvBpm');if(o)o.textContent=P.bpm;const t=$('#tvBpm');if(t)t.textContent=P.bpm}
$('#playBtn').onclick=()=>{hearStop();P.playing?stop():start()};
$('#bpmDown').onclick=()=>setBpm(P.bpm-5);$('#bpmUp').onclick=()=>setBpm(P.bpm+5);
