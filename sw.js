// Jade Tile offline cache. Bump VERSION when files change.
const VERSION='jade-tile-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const FONTS=["https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-111-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-115-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-116-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-117-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-118-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-119-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-120-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-121-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-122-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc@5.3.0/files/noto-serif-tc-123-900-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/figtree@5.3.0/files/figtree-latin-500-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/figtree@5.3.0/files/figtree-latin-600-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/figtree@5.3.0/files/figtree-latin-700-normal.woff2", "https://cdn.jsdelivr.net/npm/@fontsource/shippori-mincho-b1@5.3.0/files/shippori-mincho-b1-latin-800-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES).then(()=>Promise.all(FONTS.map(u=>fetch(u,{mode:'cors'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(VERSION).then(c=>c.put(e.request,copy))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
