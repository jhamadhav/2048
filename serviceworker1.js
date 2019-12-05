const cacheName = 'v1.01';
const assets = [
    '../index.html',
    '../css/main.css',
    '../js/cell.js',
    '../js/main.js',
    '../guide/guide.html',
    '../guide/guide.css',
    '../about/about.html',
    '../pwa/manifest.json',
    '../pwa/registerSW.js',
    '../images/2048_logo.svg_128x128.png',
    '../images/2048_logo.svg_192x192.png',
    '../images/2048_logo.svg_512x512.png',
    '../images/2048_logo.svg_152x152.png',
    '../images/2048_logo.svg_384x384.png',
    '../js/swipe.js'
];

// Call install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    // wait untill the promice is finished
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching File');
                cache.addAll(assets);
            })
            .then(() => self.skipWaiting())
    );
});

// call activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');

    // remove unwanted previously cached files
    event.waitUntil(
        /* here we will iterate through all the caches and delete all the cache other the one whose name is saved in 'cacheName' variable */
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: claering Old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// call fetch event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    // first check if live site is availabe else fetch file from cache
    event.respondWith(
        /* if there is no connection then fetching will fail then we would call a catch function since it returns a promise*/
        fetch(event.request).catch(() => caches.match(e.request))
    )
})