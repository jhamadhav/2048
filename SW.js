// This is the service worker with the Cache-first network

const cacheName = "v8";
const assets = [
    './index.html',
    './css/main.css',
    './js/cells.js',
    './js/main.js',
    './pwa/manifest.json',
    './pwa/registerSW.js',
    './images/2048_logo.svg_128.png',
    './images/2048_logo.svg_192.png',
    './images/2048_logo.svg_512.png',
    './images/2048_logo.svg_152.png',
    './images/2048_logo.svg_384.png',
    './js/swipe.js',
    './navbar/nav.css',
    './navbar/nav.js'
];

self.addEventListener("install", function (event) {
    console.log("Install Event processing");


    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log("Caching pages during install");
                return cache.addAll(assets);
            })
            .then(function () {
                console.log("Skip waiting on install");
                self.skipWaiting();
            })
    );
});

self.addEventListener("activate", function (event) {

    // Allow sw to control of current page
    console.log("Claiming clients for current page");
    event.waitUntil(self.clients.claim());

    // remove unwanted previously cached files
    event.waitUntil(
        /* here we will iterate through all the caches and delete all the cache other the one whose name is saved in 'cacheName' variable */
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: clearing Old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fromCache(event.request)
            .then(
                function (response) {
                    // The response was found in the cache so we respond with it and update the entry

                    // This is where we call the server to get the newest version of the
                    // file to use the next time we show view
                    event.waitUntil(
                        fetch(event.request)
                            .then(function (response) {
                                console.log('Updating Files: ', response);
                                return updateCache(event.request, response);
                            })
                            .catch(function (err) {
                                console.log('No network Connection: Failed to update Files', err);
                            })

                    );

                    return response;
                },
                function () {
                    // The response was not found in the cache so we look for it on the server
                    return fetch(event.request)
                        .then(function (response) {
                            // If request was success, add or update it in the cache
                            event.waitUntil(updateCache(event.request, response.clone()));

                            return response;
                        })
                        .catch(function (error) {
                            console.log("Network request failed and no cache." + error);
                        });
                }
            )
    );
});

function fromCache(request) {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }

            return matching;
        });
    });
}

function updateCache(request, response) {
    return caches.open(cacheName).then(function (cache) {
        return cache.put(request, response);
    });
}
