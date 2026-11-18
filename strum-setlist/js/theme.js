/* ---------- light / dark toggle ---------- */
const hostTheme=document.documentElement.getAttribute('data-theme');
let theme=store.get('ss-theme','auto');
const THEME_LABEL={auto:'Theme: Auto',light:'☀ Light',dark:'☾ Dark'};
function applyTheme(){const r=document.documentElement;
  if(theme==='auto'){if(hostTheme)r.setAttribute('data-theme',hostTheme);else r.removeAttribute('data-theme')}else r.setAttribute('data-theme',theme);
  document.querySelectorAll('[data-themebtn]').forEach(b=>{b.textContent=THEME_LABEL[theme];b.setAttribute('aria-label','Color theme: '+theme+'. Tap to change.')})}
function cycleTheme(){theme={auto:'light',light:'dark',dark:'auto'}[theme];store.set('ss-theme',theme);applyTheme()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-themebtn]');if(b)cycleTheme()});
applyTheme();
