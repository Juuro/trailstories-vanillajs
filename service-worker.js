const CACHE_NAME = 'v1'

const CACHED_URLS = [
  '/',
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
  '/static/js/components/Tag.js'
]

// Open cache on install.
self.addEventListener('install', event => {
  event.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME)

    await cache.addAll(CACHED_URLS)
  }())
})

// Cache and update with stale-while-revalidate policy.
self.addEventListener('fetch', event => {
  const { request } = event

  event.respondWith(async function () {
    const cache = await caches.open(CACHE_NAME)

    const cachedResponsePromise = await cache.match(request)
    const networkResponsePromise = fetch(request)

    console.log('self.location.origin: ', self.location.origin)
    console.log('request.url: ', request.url)

    if (request.url.startsWith(self.location.origin)) {
      event.waitUntil(async function () {
        const networkResponse = await networkResponsePromise

        await cache.put(request, networkResponse.clone())
      }())
    }

    return cachedResponsePromise || networkResponsePromise
  }())
})

// Clean up caches other than current.
self.addEventListener('activate', event => {
  event.waitUntil(async function () {
    const cacheNames = await caches.keys()

    await Promise.all(
      cacheNames.filter((cacheName) => {
        const deleteThisCache = cacheName !== CACHE_NAME

        return deleteThisCache
      }).map(cacheName => caches.delete(cacheName))
    )
  }())
})