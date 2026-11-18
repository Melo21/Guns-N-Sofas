function route(){const h=location.hash.slice(1);$('#app').classList.remove('wide');document.body.classList.remove('detail');setActiveTab(!h||h.startsWith('song-')?'songs':/^(changes|arcade|practice|game-)/.test(h)?'practice':['tv','tuner','about'].includes(h)?h:'songs');
  hearStop();stopGames();pvClose();tvClose();if(TN.cur!==null||TN.osc.length)tunerStop();if(h!=='changes')trStop(true);
  if(h.startsWith('song-'))songView(h.slice(5));else if(h==='changes')changes();else if(h==='arcade')arcade();
  else if(h==='game-roulette')rouletteSetup();else if(h==='game-strumback')strumbackSetup();else if(h==='game-ear')earSetup();else if(h==='tuner')tuner();else if(h==='practice')practice();else if(h==='about')about();else if(h==='tv')tvPicker();else{stop();home()}
  window.scrollTo(0,0)}
window.addEventListener('hashchange',route);route();
window.addEventListener('pointerdown',()=>{try{loadSamples()}catch(e){}},{once:true});
