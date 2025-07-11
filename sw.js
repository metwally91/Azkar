const CACHE_NAME = 'azkar-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Tajawal:wght@400;700&display=swap',
  'https://fonts.gstatic.com/s/amiriquran/v4/UqyNK9Q2u2cr62gS8de1hI-4-B0.woff2',
  'https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4kY-EB0.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
