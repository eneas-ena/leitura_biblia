/* Leitura da Bíblia — service worker
   Casca do app em cache; dados sempre da rede (com resposta guardada
   para leitura offline do que já foi aberto). */
const VERSAO = 'leitura-v1';
const CASCA = ['./', './index.html', './manifest.json', './icone-192.png', './icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // Supabase e fontes: rede primeiro, cache como rede reserva
  if (url.hostname.endsWith('supabase.co') || url.hostname.includes('fonts.') || url.hostname.includes('esm.sh')) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const copia = r.clone();
          caches.open(VERSAO).then(c => c.put(e.request, copia));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Casca: cache primeiro
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
