const CACHE_NAME = "azalove-v1.0.0";
const STATIC_CACHE = "azalove-static-v1.0.0";

// Static assets to cache
const STATIC_ASSETS = ["/", "/manifest.json", "/offline.html", "/favicon.ico"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Failed to cache static assets", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip API requests completely to avoid conflicts
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Skip character pages to avoid conflicts
  if (
    url.pathname.includes("/start-character") ||
    url.pathname.includes("/character")
  ) {
    return;
  }

  // Handle page requests with network-first strategy
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(handlePageRequest(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }
});

// Handle page requests with network-first strategy
async function handlePageRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.error("Page request failed:", error);

    // Try to serve from cache
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Serve offline page
    const offlineResponse = await cache.match("/offline.html");
    if (offlineResponse) {
      return offlineResponse;
    }

    return new Response("Offline", { status: 503 });
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error("Static asset request failed:", error);
    return new Response("Asset not found", { status: 404 });
  }
}

// Check if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/media/") ||
    url.pathname.startsWith("/fonts/") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".gif") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".ttf")
  );
}
