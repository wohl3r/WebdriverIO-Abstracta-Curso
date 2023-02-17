import BasePage from '../pages/base.page';

class HomePage extends BasePage {

  //WebElements
   get barraDeBusqueda(){ return $('#header-search #search') }
   get dropDownLanguage() {return $('#select-language')}
   //menu dropdown de botones.
   get accountMenu() {return $('.skip-link.skip-account')}
   get registerMenuBtn () {return $('.links [title="Register"]')}
   get checkoutMenuBtn () {return $('.links [title="Checkout"]]')}
   get mycartMenuBtn () {return $('.links [title="My Cart"]')}
   get myAccountMenuBtn () {return $('#header-account > .links [title="My Account"]')}
   get myWishlistMenuBtn () {return $('.links [title="My Wishlist"]')}
   get loginMenuBtn () {return $('.links [title="Log In"]')}
   get logoutMenuBtn () {return $('.links [title="Log Out"]')}
   get cartBtn(){return $('.header-minicart #header-cart')}
   get homePageView(){return $('.page')}
   get logo(){return $('.logo')}
   get Header1(){return $('.page h1')}
   //-------------------------------------------------------------------------------------------------------//

     /**
    * Escribe el artículo en el campo de búsqueda y presiona Enter
    * @param {String} articulo que se buscará
    */
     async buscar(articulo) {
        addStep(`Buscar artículo: ${articulo}`)
        await super.vaciarCampoYEnviarTexto(await this.barraDeBusqueda, articulo);
        await this.barraDeBusqueda.keys('Enter');
    }
 
   /**
     * Obtener texto de la barra de búsqueda
     */
   async obtenerTextoBusqueda() {
    addStep('Obtener texto de la barra de búsqueda')
    return await this.barraDeBusqueda.getValue();
    
  }


}
export default new HomePage();