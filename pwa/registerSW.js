let registerSW = () => {
    // This is the service worker with the Cache-first network

    // Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

    // Check compatibility for the browser we're running this in
    if ("serviceWorker" in navigator) {
        let serviceWorkerFileName = 'SW.js';
        if (navigator.serviceWorker.controller && navigator.serviceWorker.controller.scriptURL === self.location.href + serviceWorkerFileName) {
            console.log("Active service worker found, no need to register", navigator.serviceWorker.controller);
        } else {
            // Register the service worker
            navigator.serviceWorker
                .register(serviceWorkerFileName)
                .then(function (reg) {
                    console.log("Service worker has been registered: ", reg);
                })
                .catch(function (err) {
                    console.log('Service Worker Registeration error: ', err);
                });
        }
    }
}

window.addEventListener('load', registerSW);