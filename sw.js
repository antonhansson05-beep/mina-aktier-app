// version 2
// Tar emot notiser och öppnar appen på rätt sida när du trycker på dem.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
// Hämta alltid senaste versionen av själva appskalet (annars kan telefonen visa en gammal i upp till 10 minuter)
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request, { cache: "no-store" }).catch(() => fetch(e.request)));
  }
});

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data.json(); } catch (_) { d = { title: "Mina aktier", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Mina aktier", {
    body: d.body || "", icon: "ikon-192.png", badge: "ikon-192.png", data: { sida: d.sida || "" },
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const sida = (e.notification.data || {}).sida || "";
  const url = new URL("./?sida=" + encodeURIComponent(sida), self.registration.scope).href;
  e.waitUntil((async () => {
    const fonster = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const f of fonster) {
      f.postMessage({ typ: "oppna", sida });
      if ("focus" in f) return f.focus();
    }
    return self.clients.openWindow(url);
  })());
});
