self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache-name').then(function(cache) {
        return cache.addAll([
          '/assets/css/style.css',
          '/index.html',
          '/assets/js/script.js',
          '/assets/img',
        ]);
      })
    );
  });


self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.match(event.request).then(function(response) {
    // If the request is in the cache, serve it from the cache
    if (response) {
        return response;
    }

    // If the request is not in the cache, fetch it from the network
    return fetch(event.request).then(function(networkResponse) {
        // Cache the fetched response for future use
        caches.open('my-cache-name').then(function(cache) {
        cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
    }).catch(function(error) {
        // Handle network errors here
        // You can return a custom offline page or a fallback response
        console.error('Fetch error:', error);
        // Replace the following line with your preferred offline response
        return new Response('Offline content goes here');
    });
    })
);
});
  
  