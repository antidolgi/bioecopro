const CACHE_NAME = 'bioecopro-v2'; // ← Увеличили версию!
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css?v=1.0.6',
  '/script.js?v=1.0.6',
  '/assets/images/logo.png'
];

// Установка SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация SW (удаляем старый кэш)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаляю старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Стратегия: Network First для HTML, Cache First для остального
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Для HTML файлов — сначала сеть
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    // Для CSS/JS/картинок — кэш + обновление
    event.respondWith(
      caches.match(request)
        .then(response => {
          const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          });
          
          return response || fetchPromise;
        })
    );
  }
});