const SHAPES=STRUM_DATA.shapes;
const SONGS=STRUM_DATA.songs;

const STD=[82.41,110,146.83,196,246.94,329.63];
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let statuses=store.get('ss-status',{});
const uniq=a=>[...new Set(a)];
const songChords=s=>uniq(s.sections.flatMap(x=>x.bars.flat()));
let barreLvl=store.get('ss-barre',{});
const lvlOf=s=>barreLvl[s.id]||'easy';
const shapeOf=(s,c)=>(s&&s.barre&&s.barre[c])?s.barre[c][lvlOf(s)][1]:((s&&s.shapes&&s.shapes[c])||SHAPES[c]);
const shapeName=(s,c)=>(s&&s.barre&&s.barre[c])?s.barre[c][lvlOf(s)][0]:c;
const STATUS={none:'Not started',learning:'Learning',got:'Can play'};

function diagram(shape){
  const W=78,H=86,x0=16,y0=18,sw=10.4,fh=13;
  const fr=[...shape].map(ch=>/\d/.test(ch)?+ch:null),pos=fr.filter(f=>f>0),mn=pos.length?Math.min(...pos):1,mx=pos.length?Math.max(...pos):1;
  const base=mx>5?mn:1,Y=f=>y0+(f-base+.5)*fh;
  let o=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">`;
  if(base===1)o+=`<rect x="${x0}" y="${y0-3}" width="${sw*5}" height="3" fill="currentColor"/>`;
  else o+=`<text x="${x0-4}" y="${y0+fh*.5+3}" font-size="9" text-anchor="end" fill="currentColor">${base}fr</text>`;
  for(let i=0;i<6;i++)o+=`<line x1="${x0+i*sw}" y1="${y0}" x2="${x0+i*sw}" y2="${y0+fh*5}" stroke="currentColor" stroke-opacity=".5"/>`;
  for(let f=0;f<=5;f++)o+=`<line x1="${x0}" y1="${y0+f*fh}" x2="${x0+sw*5}" y2="${y0+f*fh}" stroke="currentColor" stroke-opacity=".35"/>`;
  if(fr[5]===mn&&mn>0){let L=5;for(let i=5;i>=0;i--){if(fr[i]===null||fr[i]===0)break;if(fr[i]===mn)L=i}
    if(L<5)o+=`<rect x="${x0+L*sw-4.4}" y="${Y(mn)-4.4}" width="${(5-L)*sw+8.8}" height="8.8" rx="4.4" fill="currentColor"/>`}
  [...shape].forEach((ch,i)=>{const x=x0+i*sw;
    if(ch==='x')o+=`<text x="${x}" y="${y0-7}" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity=".6">×</text>`;
    else if(ch==='0')o+=`<circle cx="${x}" cy="${y0-9}" r="3" fill="none" stroke="currentColor"/>`;
    else o+=`<circle cx="${x}" cy="${Y(+ch)}" r="4.4" fill="currentColor"/>`;});
  return o+'</svg>';
}
