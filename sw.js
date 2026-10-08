// Service worker: permite instalar la app y abrirla aunque falle el internet.
// Páginas y menu.json: primero internet (siempre lo más nuevo), si no hay, la copia guardada.
// Fotos, videos e íconos: primero la copia guardada (carga instantánea).
const CACHE = "sabora-v1";
const BASE = ["./", "index.html", "admin.html", "menu.json", "icon.svg", "editor.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return; // GitHub API y CDNs pasan directo
  if (url.search) return; // consultas con ?t=… (verificación de publicación) van directo a internet

  const estatico = /\/media\/|\.(png|svg|webp|jpe?g|mp4|mov|webm)$/i.test(url.pathname);
  if (estatico && req.headers.get("range") === null) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok && res.status === 200) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
      return res;
    })));
    return;
  }
  if (estatico) return; // videos pedidos por partes (range): directo

  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
    return res;
  }).catch(() => caches.match(req).then(hit => hit || caches.match(req.mode === "navigate" ? "./" : req))));
});
