const myCacheName = 'Resturant-V1'

self.addEventListener('install', event => {
  console.log('installed')
  event.waitUntil(
    caches.open(myCacheName).then(function (cache) {
      return cache.addAll(
        [
          'js/main.js',
          'js/dbhelper.js',
          'js/restaurant_info.js',
          'data/restaurants.json',
          'index.html',
          'restaurant.html',
          'sw.js',
          'css/styles.css',
          'manifest.json',
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'img/10.jpg',
          './'
        ]
      );
    })
  );
})
//nihb
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