self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/mannschaftskasse/',
        '/mannschaftskasse/index.html',
        '/mannschaftskasse/manifest.json',
        '/mannschaftskasse/icon-192x192.png',
        '/mannschaftskasse/icon-512x512.png',
        '/mannschaftskasse/icon-180x180.png', // Hinzugefügt
        '/mannschaftskasse/icon-167x167.png', // Hinzugefügt
        '/mannschaftskasse/styles.css', // Wenn du eine CSS-Datei hast
        '/mannschaftskasse/script.js'  // Wenn du eine JavaScript-Datei hast
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        // Caching von dynamischen Anfragen (optional)
        return caches.open('v1').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
