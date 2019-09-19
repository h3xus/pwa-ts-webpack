import { urlBase64ToUint8Array } from "./helpers";

export class PWAService {

  sw: ServiceWorkerRegistration;
  constructor(serviceWorker: ServiceWorkerRegistration) {
    this.sw = serviceWorker
  }
  sync (){
    this.sw.sync.register('colors');
  }
};


export const registerServiceWorker = async () => {
    const registrastion = await navigator.serviceWorker.register('./worker.js');
      return new PWAService(registrastion);

}
