import BasePage from '../pages/base.page';

class BusquedaPage extends BasePage {
    
   //Elementos Web
   get resultado(){ return $(`.product-info h2`) }
   get barraBusqueda(){return $('#header-search #search')}
   //-------------------------------------------------------------------------------------------------------//
 
   /**
    * Click en el resultado de la búsqueda
    */
   async ingresarAlResultado() {
       await super.clickearElemento(this.resultado);
   }

   /**
    * Obtener texto del resultado de la búsqueda
    */
   async obtenerNombreResultado() {
       return await this.resultado.getText();
   }

}

export default new BusquedaPage();