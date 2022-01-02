self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/conifers2.svg',
        '/index.html',
        '/static/css/styles.css',
        '/static/js/app.js',
        '/static/js/loadPosts.js',
        '/static/js/router.js',
        '/static/js/utilities.js',
        '/static/js/views/About.js',
        '/static/js/views/AbstractView.js',
        '/static/js/views/Home.js',
        '/static/js/views/Imprint.js',
        '/static/js/views/Post.js',
        '/static/js/components/Tag.js'      ])
    })
  )
})

self.addEventListener('activate', (event) => {
  var cacheKeeplist = ['v1']

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone()
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone)
        })
        return response
      })
    }
  }))
})