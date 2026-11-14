const CACHE='mr-guitar-v22-3-20261114';
const ASSETS=['./', './index.html', './manifest.webmanifest', './guitarras-portada-191.webp', './icon-192.png', './icon-512.png', './fundamentos/clasica-natural.webp', './fundamentos/clavijas-acustica.webp', './fundamentos/electrica-sunburst.webp', './fundamentos/electroacustica-negra.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&(k.startsWith('guitar-master-')||k.startsWith('mr-guitar-'))).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===self.location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request)))});
