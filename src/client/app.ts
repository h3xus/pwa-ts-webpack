import { Color, ColorsManager } from './colors';
import { PWAService, registerServiceWorker } from './pwa';
import { ColorsDb } from './db';
import { saveColor, loadColors } from './request';


window.addEventListener('DOMContentLoaded', async () => {
    const db = new ColorsDb();


    const PWA = await registerServiceWorker();

    const clicker = document.querySelector('.clicker');
    const saver = document.querySelector('.buttons .save');
    const colorsManager = new ColorsManager(
        document.querySelector('body')!,
        document.querySelector<HTMLElement>('.colors')!
    );

    const next = () => {
        currentColor = colorsManager.nextRandomColor();
        colorsManager.applyBgColor(currentColor);
    }

    let currentColor: Color;

    clicker!.addEventListener('click', next);

    saver!.addEventListener('click', () => {
        colorsManager.displaySavedColor(currentColor); //add to template
        db.saveColor(currentColor);
        PWA.sync()
    });

    next();
    (await db.getAllColors()).map((colorDTO) => {
         return colorDTO.color;
     }).forEach((color: Color) => {
         colorsManager.displaySavedColor(color);
     });


    // const colors = await loadColors()
    // const colors = await db.getAllColors();
    // colors.forEach((colorDTO) => {
    //     colorsManager.displaySavedColor(colorDTO.color);
    // });
});
