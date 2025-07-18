const CACHE_NAME = 'meet-app-v1';
const EVENT_API = 'https://api-url-for-events.com'; // Replace with your real API URL

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept GET requests to the event API
  if (request.method === 'GET' && request.url.includes(EVENT_API)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request).then((networkResponse) => {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, cloned);
          });
          return networkResponse;
        });
      }).catch(() => {
        // Fallback response if both cache and network fail
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
  }
});