const PAGE_TIMEOUT = 10000
import allure from "@wdio/allure-reporter";
export default class BasePage {

    //Elementos web
    get header1(){return $('h1')}


   /**
    * Abrir página
    * @param {String} ruta a la cual acceder
    */
   async abrir(ruta) {

       allure.addStep("Abrir la pagina web.");
       await browser.url(`${ruta}`);
   }


   /**
    * Esperar a que un elemento sea clickeable y hacer click
    * @param {Object} elemento a clickear
    */
   async clickearElemento(elemento) {
       await elemento.waitForClickable({ timeout: PAGE_TIMEOUT });
       await elemento.click();
   }


   /**
    * Método para enviar texto a un elemento
    * @param {Object} elemento que recibirá el texto
    * @param {String} texto a envíar 
    */
   async vaciarCampoYEnviarTexto(elemento, texto){
       await elemento.waitForClickable({ timeout: PAGE_TIMEOUT });
       await elemento.clearValue();
       await elemento.click();
       await elemento.keys(texto);
   }


}