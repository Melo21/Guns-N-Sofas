/* Offline support for Guns N' Sofas.
 * Bump VERSION whenever app files change so phones pick up the update. */
const VERSION = 'gns-v1.1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'css/styles.css', 'data/chords.js', 'data/songs.js', 'js/app.js', 'js/arcade.js', 'js/audio.js', 'js/chord-changes.js', 'js/core.js', 'js/hear-pattern.js', 'js/play-view.js', 'js/player.js', 'js/shell.js', 'js/theme.js', 'js/tuner.js', 'js/tv-mode.js', 'js/views.js', 'samples/As2.mp3', 'samples/As3.mp3', 'samples/As4.mp3', 'samples/Cs3.mp3', 'samples/Cs4.mp3', 'samples/E2.mp3', 'samples/E3.mp3', 'samples/E4.mp3', 'samples/G2.mp3', 'samples/G3.mp3', 'samples/G4.mp3', 'icons/favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Serve from the cache right away, and refresh the cache in the background. Fonts are cached as they load. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameSite = url.origin === location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameSite && !isFont) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: sameSite });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
