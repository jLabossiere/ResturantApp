const myCacheName = 'Resturant-V1'

self.addEventListener('install', event => {
  console.log('installed')
  event.waitUntil(
    caches.open(myCacheName).then(function (cache) {
      return cache.addAll(
        [
          './js/main.js',
          './index.html',
          './sw.js',
          './css/styles.css',
          //'../manifest.json',
        ]
      );
    })
  );
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('Resturant-') && cacheName !== myCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  console.log('activated')
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(myCacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  )
})