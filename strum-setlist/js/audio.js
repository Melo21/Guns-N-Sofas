/* ---------- audio ---------- */
let ctx=null; const cache={};
function ac(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();return ctx}
function pluckInto(out,start,freq,gain,sr){
  const N=Math.max(2,Math.round(sr/freq)),buf=new Float32Array(N);
  for(let i=0;i<N;i++)buf[i]=Math.random()*2-1;
  let idx=0;
  for(let i=start;i<out.length;i++){const a=buf[idx],b=buf[(idx+1)%N];out[i]+=a*gain;buf[idx]=(a+b)*.4985;idx=(idx+1)%N}
}
function strumBuffer(shape,capo,dir){
  const key=shape+capo+dir;if(cache[key])return cache[key];
  const c=ac(),sr=c.sampleRate,len=Math.floor(sr*1.6),b=c.createBuffer(1,len,sr),out=b.getChannelData(0);
  let strings=[...shape].map((ch,i)=>ch==='x'?null:STD[i]*Math.pow(2,(+ch+capo)/12)).map((f,i)=>({f,i})).filter(o=>o.f);
  if(dir==='U')strings=strings.slice(-4).reverse();
  strings.forEach((s,k)=>pluckInto(out,Math.floor(k*sr*.011),s.f,dir==='U'?.11:.16,sr));
  return cache[key]=b;
}
function click(t,accent){const c=ac(),o=c.createOscillator(),g=c.createGain();o.frequency.value=accent?1600:1050;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(accent?.35:.2,t+.002);g.gain.exponentialRampToValueAtTime(.0001,t+.05);
  o.connect(g).connect(c.destination);o.start(t);o.stop(t+.06)}
/* Acoustic guitar samples from nbrosowsky/tonejs-instruments (CC BY 3.0), pitch-shifted to the nearest note.
   If they cannot load (for example when index.html is opened straight from disk), a synthesized pluck is used instead. */
const SAMPLE_FILES={"40": "samples/E2.mp3", "43": "samples/G2.mp3", "46": "samples/As2.mp3", "49": "samples/Cs3.mp3", "52": "samples/E3.mp3", "55": "samples/G3.mp3", "58": "samples/As3.mp3", "61": "samples/Cs4.mp3", "64": "samples/E4.mp3", "67": "samples/G4.mp3", "70": "samples/As4.mp3"};
const OPEN_MIDI=[40,45,50,55,59,64];
const SB={};let sbLoading=null;
function loadSamples(){if(sbLoading)return sbLoading;const c=ac();
  sbLoading=Promise.all(Object.entries(SAMPLE_FILES).map(([m,url])=>fetch(url).then(r=>{if(!r.ok)throw new Error(url);return r.arrayBuffer()})
    .then(buf=>new Promise(res=>{try{c.decodeAudioData(buf,b=>{SB[m]=b;res()},()=>res())}catch(e){res()}})).catch(()=>{})));return sbLoading}
function nearest(m){let best=null,d=99;for(const k in SB){const dd=Math.abs(m-k);if(dd<d){d=dd;best=+k}}return best}
let lastVoices=[];
function strum(t,shape,capo,dir,chop,vol=1,mute=false){
  const c=ac();loadSamples();
  lastVoices.forEach(g=>{try{g.gain.setTargetAtTime(0,t,.035)}catch(e){}});lastVoices=[];
  let strings=[...shape].map((ch,i)=>ch==='x'?null:{m:OPEN_MIDI[i]+(+ch)+capo,i}).filter(Boolean);
  if(!Object.keys(SB).length){ // samples still loading: fall back to the plucked-string sound
    const src=c.createBufferSource(),g=c.createGain();src.buffer=strumBuffer(shape,capo,dir);g.gain.setValueAtTime(1,t);if(chop)g.gain.setTargetAtTime(0,t+.11,.02);
    src.connect(g).connect(c.destination);src.start(t);src.stop(t+1.6);lastVoices.push(g);return}
  if(dir==='U')strings=strings.slice(-4).reverse();
  const spread=dir==='U'?.009:.013,base=dir==='U'?.26:.36;
  strings.forEach((s,k)=>{const sm=nearest(s.m);if(sm===null)return;
    const src=c.createBufferSource(),g=c.createGain(),st=t+k*spread;
    src.buffer=SB[sm];src.playbackRate.value=Math.pow(2,(s.m-sm)/12);
    const v=vol*base*(0.85+Math.random()*.3)*(dir==='U'?1:(0.8+0.2*k/strings.length));
    g.gain.setValueAtTime(mute?v*.85:v,st);if(chop)g.gain.setTargetAtTime(0,st+.1,.02);if(mute)g.gain.setTargetAtTime(0,st+.03,.045);
    if(mute){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=1400;src.connect(f).connect(g).connect(c.destination)}else src.connect(g).connect(c.destination);src.start(st,.045);src.stop(st+2.6);lastVoices.push(g)})
}
const SYM={D:'↓',U:'↑','-':'·',X:'✕',B:'B'},CLS={D:'down',U:'up','-':'miss',X:'chuck',B:'bass'};
const isSoft=d=>d!=='-'&&d!==d.toUpperCase();
const symOf=d=>SYM[d.toUpperCase()]||'·';
const clsOf=d=>(CLS[d.toUpperCase()]||'miss')+(isSoft(d)?' soft':'');
const CNT=['1','&','2','&','3','&','4','&'];
let noiseBuf=null;
function chuckSound(t,vol=1){const c=ac();
  lastVoices.forEach(g=>{try{g.gain.setTargetAtTime(0,t,.008)}catch(e){}});lastVoices=[];
  if(!noiseBuf){const sr=c.sampleRate,n=Math.floor(sr*.09);noiseBuf=c.createBuffer(1,n,sr);const d=noiseBuf.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3)}
  const src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();src.buffer=noiseBuf;f.type='bandpass';f.frequency.value=1700;f.Q.value=.7;
  g.gain.setValueAtTime(.55*vol,t);src.connect(f).connect(g).connect(c.destination);src.start(t);
  const lo=c.createOscillator(),lg=c.createGain();lo.frequency.value=110;lg.gain.setValueAtTime(.18*vol,t);lg.gain.exponentialRampToValueAtTime(.0001,t+.06);lo.connect(lg).connect(c.destination);lo.start(t);lo.stop(t+.07)}
/* d: D/U full strum, d/u light strum, X chuck, B bass note, - rest */
function stroke(t,shape,capo,d,o={}){
  if(d==='-')return;
  const D=d.toUpperCase(),vol=(o.vol||1)*(isSoft(d)?.45:1);
  if(D==='X')return chuckSound(t,vol);
  if(D==='B'){const i=[...shape].findIndex(ch=>ch!=='x');const bs=[...shape].map((ch,k)=>k===i?ch:'x').join('');return strum(t,bs,capo,'D',false,1.3*vol,!!o.pm)}
  if(isSoft(d)&&D==='D'){ // a light down strum brushes only the lower few strings
    const on=[...shape].map((ch,k)=>ch!=='x'?k:-1).filter(k=>k>=0),top=on.slice(-4);
    const keep=[...shape].map((ch,k)=>top.includes(k)?ch:'x').join('');return strum(t,keep,capo,'D',o.chop,vol,!!o.pm)}
  strum(t,shape,capo,D,o.chop,vol,!!o.pm)}
const pmAt=(s,si)=>!!(s.pm||(s.sections[si]&&s.sections[si].pm));
/* human feel: beat 1 strongest, offbeats lighter, tiny timing drift, up strums a hair behind */
const ACC=[1,.8,.9,.8,.96,.8,.9,.84];
const feel=(t,slot)=>t+(Math.random()-.5)*.012+(slot%2?((P.song&&P.song.swing)?(60/P.bpm/2)/3:.007):0);
const secPat=(s,si)=>(s.sections[si]&&s.sections[si].strum)||s.strum;
function barPat(s,si,k,last){const sec=s.sections[si];if(last&&sec.fill)return sec.fill;const p=secPat(s,si);return p.length>8?p.slice((k%2)*8,(k%2)*8+8):p}
