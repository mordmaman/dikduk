// Offline support for Dikduk.
// The page (index.html) is fetched from the network first, so a new version
// shows up as soon as it is published; the cached copy is used when offline.
// Fonts and icons never change, so they are served from the cache first.
// Bump CACHE only if the list of files below changes.

const CACHE = 'dikduk-v2';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './fonts/FrankRuhlLibre-Hebrew-400.woff2',
  './fonts/FrankRuhlLibre-Hebrew-700.woff2',
  './fonts/NotoSerifHebrew-Hebrew-400.woff2',
  './icons/favicon.svg',
  './icons/apple-touch-icon.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon-maskable-192x192.png',
  './icons/icon-maskable-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('dikduk-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
        }
        return res;
      })
      .catch(() => caches.match('./index.html').then((hit) => hit || caches.match('./'))));
    return;
  }

  event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then((cache) => cache.put(req, copy));
    }
    return res;
  })));
});
