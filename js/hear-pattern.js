/* ---------- hear one section's strum pattern ---------- */
const H={on:false,timeouts:[],btn:null};
function hearStop(){H.timeouts.forEach(clearTimeout);H.timeouts=[];H.on=false;lastVoices.forEach(g=>{try{g.gain.setTargetAtTime(0,ac().currentTime,.03)}catch(e){}});
  document.querySelectorAll('.pattern .arw.hit').forEach(e=>e.classList.remove('hit'));
  document.querySelectorAll('[data-hear]').forEach(b=>b.textContent='▶ Hear it');H.btn=null}
function hearPattern(s,si,btn){
  const same=H.on&&H.btn===btn;hearStop();if(same)return;
  if(P.playing)stop();
  const c=ac();if(c.state==='suspended')c.resume();loadSamples();
  H.on=true;H.btn=btn;btn.textContent='■ Stop';
  const sec=s.sections[si],dur=60/P.bpm/2,t0=c.currentTime+.15,bars=4,base=secPat(s,si);
  for(let k=0;k<bars;k++){const last=k===bars-1,pat=barPat(s,si,k,last),ch=sec.bars[k%sec.bars.length],
      row=(last&&sec.fill)?`f${si}-0`:`b${si}-${base.length>8?k%2:0}`,cells=[...document.querySelectorAll(`[data-row="${row}"] .arw`)];
    for(let slot=0;slot<8;slot++){const t=t0+(k*8+slot)*dur,chord=chordAt({chords:ch},slot);
      if(slot%2===0)click(t,slot===0);
      stroke(feel(t,slot),shapeOf(s,chord),s.capo,pat[slot],{chop:s.chop,pm:pmAt(s,si),vol:(sec.vol||1)*ACC[slot]});
      H.timeouts.push(setTimeout(()=>{document.querySelectorAll('.pattern .arw.hit').forEach(e=>e.classList.remove('hit'));if(cells[slot])cells[slot].classList.add('hit')},Math.max(0,(t-c.currentTime)*1000)))}}
  H.timeouts.push(setTimeout(hearStop,(t0+bars*8*dur-c.currentTime)*1000+150));
}
