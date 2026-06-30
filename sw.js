// Caches the whole arcade (hub + every game) for offline play after the first visit.
const CACHE = 'tiki-arcade-v6';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icon-180.png', './icon-192.png', './icon-512.png',
  './merge/', './merge/index.html',
  './tycoon/', './tycoon/index.html',
  './blast/', './blast/index.html',
  './crush/', './crush/index.html',
  './notes.js', './notes/', './notes/index.html'
];
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => { try { c.put(e.request, copy); } catch (_) {} });
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
