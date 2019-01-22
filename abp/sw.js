const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './artistsbyplaylist.html',
  './styles.css',
  './client.js',
  'https://fonts.googleapis.com/css?family=Lato',
  'https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2',
  'https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Fetch new non cached resources
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// based on https://developers.google.com/web/fundamentals/primers/service-workers/