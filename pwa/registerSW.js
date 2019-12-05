let registerSW = () => {
    // first check if service worker is supported in the browser
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./SW.js')
            .then(reg => console.log('Service Worker Registered', reg))
            .catch(err => console.log('Service Worker Registeration error: ', err));
    }
}
window.addEventListener('load', registerSW);