const CACHE='number-island-cache-v24';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('number-island-cache-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const u=new URL(event.request.url);if(u.origin!==self.location.origin)return;
 const pathname=u.pathname;const isDocument=event.request.mode==='navigate'||pathname.endsWith('/index.html')||pathname.endsWith('/');
 if(isDocument){event.respondWith(fetch(event.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));}return res;}).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));return;}
 event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(event.request,cp));}return res;})));
});
