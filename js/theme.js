/* ---------- light / dark toggle ---------- */
const hostTheme=document.documentElement.getAttribute('data-theme');
let theme=store.get('ss-theme','auto');
const THEME_LABEL={auto:'Auto theme',light:'☀ Light',dark:'☾ Dark'};
const THEME_NAME={auto:'Match device',light:'Light',dark:'Dark'};
function applyTheme(){const r=document.documentElement;
  if(theme==='auto'){if(hostTheme)r.setAttribute('data-theme',hostTheme);else r.removeAttribute('data-theme')}else r.setAttribute('data-theme',theme);
  document.querySelectorAll('[data-themebtn]').forEach(b=>{if(!b.classList.contains('iconbtn'))b.textContent=THEME_LABEL[theme];b.setAttribute('aria-label','Theme: '+THEME_NAME[theme]+'. Tap to change.')})}
function cycleTheme(){theme={auto:'light',light:'dark',dark:'auto'}[theme];store.set('ss-theme',theme);applyTheme();if(typeof toast==='function')toast('Theme: '+THEME_NAME[theme])}
document.addEventListener('click',e=>{const b=e.target.closest('[data-themebtn]');if(b)cycleTheme()});
applyTheme();
