/* Leitura da Bíblia — service worker
   Rede primeiro para o HTML (atualizações aparecem na hora),
   cache como reserva quando estiver offline. */
const VERSAO = 'leitura-v3';
const CASCA = ['./', './index.html', './manifest.json', './icone-192.png', './icone-512.png', './favicon.ico', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSAO)
      .then(c => c.addAll(CASCA))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const ehDocumento = e.request.mode === 'navigate'
    || e.request.destination === 'document'
    || url.pathname.endsWith('.html');

  // HTML, Supabase, fontes e módulos: rede primeiro
  if (ehDocumento
      || url.hostname.endsWith('supabase.co')
      || url.hostname.includes('fonts.')
      || url.hostname.includes('esm.sh')) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const copia = r.clone();
          caches.open(VERSAO).then(c => c.put(e.request, copia));
          return r;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Ícones e demais estáticos: cache primeiro
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
