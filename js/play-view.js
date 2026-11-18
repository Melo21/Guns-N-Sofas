/* ---------- big play view ---------- */
const PV={open:false,wake:null,lastSi:-1};
function idleWake(){try{if(!PV.open&&!TV.open&&!TR.running&&!G.running)wakeOff()}catch(e){}}
async function wakeOn(){try{if(navigator.wakeLock&&!PV.wake){PV.wake=await navigator.wakeLock.request('screen');PV.wake.addEventListener('release',()=>{PV.wake=null})}}catch(e){PV.wake=null}}
function wakeOff(){try{if(PV.wake)PV.wake.release()}catch(e){}PV.wake=null}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&(PV.open||TV.open||P.playing||TR.running||G.running))wakeOn()});
function pvOpen(){
  const s=P.song;if(!s)return;hearStop();PV.open=true;PV.lastSi=-1;
  $('#pvSong').textContent=s.title;
  $('#pvLoop').innerHTML=`<option value="all">Whole song</option>`+s.sections.map((x,i)=>`<option value="${i}">${x.name}</option>`).join('');
  $('#pvLoop').value=P.loop===null?'all':String(P.loop);
  $('#pv').hidden=false;document.body.classList.add('pv-lock');applyTheme();pvReset();wakeOn();
}
function pvClose(){if(!PV.open)return;PV.open=false;$('#pv').hidden=true;document.body.classList.remove('pv-lock');if(!P.playing)wakeOff()}
function pvReset(){if(!PV.open)return;flatten();const f=P.flat[0];
  $('#pvLabel').textContent='Tap play';pvChord(f.chords[0]);pvNext(0,0);pvSection(f.si,f.bi);pvStrum(f.pat,-1);$('#pvBpm').textContent=P.bpm;
  $('#pvPlay').textContent=P.playing?'■':'▶';$('#pvPlay').setAttribute('aria-label',P.playing?'Stop':'Play')}
function pvChord(c){$('#pvChord').textContent=c;{const sh=shapeOf(P.song,c);$('#pvDiag').innerHTML=sh?diagram(sh):''}
  const nm=shapeName(P.song,c);$('#pvShape').textContent=nm!==c?nm:''}
function pvNext(bi,slot){ // next chord change and how many beats away
  const fl=P.flat;let cur=chordAt(fl[bi],slot),b=bi,sl=slot,n=0;
  for(let k=0;k<64;k++){sl++;if(sl>7){sl=0;b=(b+1)%fl.length}n++;const c=chordAt(fl[b],sl);if(c!==cur){
    $('#pvNext').textContent=c;$('#pvNDiag').innerHTML=diagram(shapeOf(P.song,c));const beats=Math.ceil(n/2);$('#pvIn').textContent=beats<=8?'in '+beats+(beats===1?' beat':' beats'):'';return}}
  $('#pvNext').textContent='Same';$('#pvNDiag').innerHTML='';$('#pvIn').textContent=''}
function pvSection(si,bi){const sec=P.song.sections[si];
  if(si!==PV.lastSi){PV.lastSi=si;const tags=feelTag(sec,P.song);$('#pvSec').textContent=sec.name+(tags.length?' · '+tags.join(' · '):'');
    $('#pvBars').innerHTML=sec.bars.map((b,i)=>`<span class="pvbar" data-pb="${i}">${b.join(' ')}</span>`).join('')}
  document.querySelectorAll('.pvbar').forEach(e=>e.classList.toggle('cur',+e.dataset.pb===bi))}
let pvPat=null;
function pvStrum(pat,slot){if(pat!==pvPat){pvPat=pat;$('#pvStrum').innerHTML=[...pat].map((d,i)=>`<div class="pvs ${clsOf(d)}"><b>${symOf(d)}</b><small>${CNT[i]}</small></div>`).join('')}
  document.querySelectorAll('.pvs').forEach((e,i)=>e.classList.toggle('hit',i===slot&&pat[i]!=='-'))}
function pvShow(it){if(!PV.open)return;
  if(it.count){$('#pvLabel').textContent='Count-in';$('#pvChord').textContent=String(Math.floor(it.slot/2)+1);$('#pvDiag').innerHTML='';$('#pvShape').textContent='';
    const f=P.flat[0];$('#pvNext').textContent=f.chords[0];$('#pvNDiag').innerHTML=diagram(shapeOf(P.song,f.chords[0]));$('#pvIn').textContent='first';pvStrum(f.pat,-1);return}
  const bar=P.flat[it.bi];$('#pvLabel').textContent='Play';
  if($('#pvChord').textContent!==it.chord)pvChord(it.chord);
  pvNext(it.bi,it.slot);pvSection(bar.si,bar.bi);pvStrum(bar.pat,it.slot)}

$('#pvOpenBtn').onclick=pvOpen;$('#pvExit').onclick=pvClose;
$('#pvPlay').onclick=()=>{hearStop();P.playing?stop():start()};
$('#pvDown').onclick=()=>setBpm(P.bpm-5);$('#pvUp').onclick=()=>setBpm(P.bpm+5);
$('#pvLoop').onchange=e=>{P.loop=e.target.value==='all'?null:+e.target.value;PV.lastSi=-1;updateLoop();if(P.playing){stop();start()}else resetNow()};
window.addEventListener('keydown',e=>{if(PV.open&&e.key==='Escape')pvClose()});
