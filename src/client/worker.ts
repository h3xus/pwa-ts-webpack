console.log('WORKER dddd!');
import { saveColor } from "./request";

const db = new ColorsDb();

const CACHE_NAME = 'colors-cache-v1';

self.addEventListener('install', (event: any) => {

    event.waitUntil((async ()=> {
              const cache = await caches.open(CACHE_NAME);
              await cache.addAll([
                './assets/opensans.woff2',
                './app.js',
                './styles.js',
                './'
              ]);
    })());
});

self.addEventListener('fetch', (event: any) => {

  event.respondWith((async() =>{
    const request: Request = event.request;
    const myCache = await caches.open(CACHE_NAME);
    const response = await myCache.match(request);
    if (!response){
      return fetch(request)
    }
    return response

  })());
});


self.addEventListener('sync', (event: any) => {

  event.respondWith(( async() => {
    console.log(event.tag);

    const allUnsynced = await db.getUnsyncedColors();
    return Promise.all(allUnsynced.map( async(unsynced) => {
      try {
        await saveColor(unsynced.color);
        await db.markSynced(unsynced);
      } catch(e) {
        console.log(e);
      }

    }))

  })());

})


    // const cache = await caches.open(CACHE_NAME);

    //
    // bigPromise = caches.open(CACHE_NAME).then(() =>{
    //   return promise
    // })

//
// self.addEventListener('install', (event: any) => {
//
//     event.waitUntil();
// });
