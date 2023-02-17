const { assert } = require("chai");
import allure from "@wdio/allure-reporter";
import basepage from '../pages/base.page';
import homePage from '../pages/home.page';
import busquedaPage from '../pages/busqueda.page';
import createaccount from '../pages/createaccount.page';
import loginpage from '../pages/login.page';
import DATOS from '../datos/usuarios'
import ARTICULOS from '../datos/articulos';
import itemPage from "../pages/item.page";
import checkoutPage from "../pages/checkout.page";
import billingPage from "../pages/billing.page";

const nombreusuario = "joaco@gmail.com";
const contraseñausuario = "test1234";
const ciudad = "Auburn";
const postcode = "11000"

describe('Magento-Demo', () => {
    before(async()=> {
        await homePage.abrir('/');

    })
    it('Debe hacer Login en el sitio.', async()=>
    {        
        await loginpage.login(nombreusuario,contraseñausuario);
        allure.addStep("Verificar que el login fue exitoso.");
        assert.equal (await homePage.Header1.getText(),"MY DASHBOARD", "Error: pagina no coincide.");
        await homePage.logo.click();
        await loginpage.logout();
    })

    it('Debe hacer Logout del sitio previamente ingresado.',async() =>
    {
        
        await loginpage.login(nombreusuario,contraseñausuario);
        await homePage.accountMenu.click();
        await homePage.myAccountMenuBtn.click();
        assert.equal (await homePage.Header1.getText(),"MY DASHBOARD", "Error: pagina no coincide.");
        await loginpage.logout();
        assert.equal (await homePage.Header1.getText(),"YOU ARE NOW LOGGED OUT", "Error: pagina no coincide.");
        allure.addStep("Comparar Screenshots");
        chaiExpect(await browser.checkElement(await homePage.homePageView,"wdio-mainPageView",{}), "Error: No coincide.").equal(0);
    })  

    DATOS.forEach(({username}) =>{
        it('Debe hacer Register en el sitio.',async () =>
        {
            var alphanumericString = Math.random().toString(36).slice(2);
            allure.addStep("Clickear en el dropdown de Account");            
            await homePage.accountMenu.click();
            allure.addStep("Click en register");
            await homePage.registerMenuBtn.click()
            assert.equal(await homePage.Header1.getText(),"CREATE AN ACCOUNT", "Error: pagina no coincide.");
            allure.addStep("Introducir datos de usuario.");
            await (await createaccount.firstNameField).setValue(username);
            allure.addStep("Introducir apellido.");
            await (await createaccount.lastNameField).setValue(alphanumericString);
            allure.addStep("Introducir email.");            
            await (await createaccount.emailAddressField).setValue(alphanumericString + "@gmail.com");
            allure.addStep("Introducir contraseña.");
            await (await createaccount.passwordField).setValue("test1234!");
            allure.addStep("Introducir confirmacion de contraseña.");
            await (await createaccount.confirmPasswordField).setValue("test1234!");
            allure.addStep("Clickear Checkbox de Newsletter.");
            await (await createaccount.chkNewsletter).click();
            allure.addStep("Clickear boton de Register..");
            await createaccount.registerBtn.click();
            allure.addStep("Validar que estamos en la pagina de dashboard.");
            assert.equal(await homePage.Header1.getText(),"MY DASHBOARD", "Error: pagina no coincide.");   //h1         
            allure.addStep("Validar la alerta que indica que nos registramos.");
            assert.equal (await createaccount.registerAlert.getText(), "Thank you for registering with Madison Island.", "Error: Pifia");
            await loginpage.logout();
        })
    }) 
    it('Ingresar datos de Facturación para usar en el checkout.', async()=>
    {
        var alphanumericString = Math.random().toString(36).slice(2);
        await homePage.abrir('/');  
        await loginpage.login(nombreusuario,contraseñausuario);
        allure.addStep("Clickear en el dropdown de Account");            
        await homePage.accountMenu.click();
        allure.addStep("Clickear en el Boton 'My Account'");            
        await homePage.myAccountMenuBtn.click();
        allure.addStep("Clickear en el link 'Address Book'");            
        await billingPage.addressBookBtnLink.click();
        allure.addStep("Clickear en el link 'Change Billing Address'");            
        await billingPage.addressChangeBtnLink.click();
        allure.addStep("Seleccionar casilla de Firstname e introducir dato.");            
        await billingPage.addressFirstname.click();
        await (await billingPage.addressFirstname).clearValue();
        await (await billingPage.addressFirstname).setValue("Joaquin");
        allure.addStep("Seleccionar casilla de Lastname e introducir dato.");            
        await billingPage.addressLastname.click();
        await (await billingPage.addressLastname).setValue("Wohler");
        allure.addStep("Seleccionar casilla de Company e introducir dato.");            
        await (await billingPage.addressCompany).setValue("Abstracta");
        allure.addStep("Seleccionar casilla de Telephone e introducir dato.");            
        await (await billingPage.addressTelephone).setValue(alphanumericString);
        allure.addStep("Seleccionar casilla de Fax e introducir dato.");            
        await (await billingPage.addressFax).setValue(alphanumericString);
        allure.addStep("Seleccionar casilla de Street 1 e introducir dato.");            
        await (await billingPage.addressStreet1).setValue(alphanumericString);
        allure.addStep("Seleccionar casilla de Street2 e introducir dato.");            
        await (await billingPage.addressStreet2).setValue(alphanumericString);
        allure.addStep("Seleccionar casilla de City e introducir dato.");            
        await (await billingPage.addressCity).setValue(ciudad);
        allure.addStep("Seleccionar casilla de Zipcode e introducir dato.");            
        await (await billingPage.addressZipcode).setValue(postcode);
        allure.addStep("Seleccionar casilla de Country e introducir dato.");            
        await billingPage.addressCountryDropdown.click();
        await (await billingPage.addressCountryDropdown).selectByIndex(233)
        allure.addStep("Seleccionar casilla de State e introducir dato.");            
        await (await billingPage.addressStateDropdown).selectByIndex(3);
        allure.addStep("Clickear boton de Save Address");            
        await billingPage.saveAddressBtn.click();
        await browser.waitUntil(
            async ()=>(await billingPage.billingHeader.getText()).includes('ADDRESS BOOK'),
            { timeoutMsg:'el elemento no contiene la palabra ADDRESS', interval:1000 }
          ); 
          allure.addStep("Validar que la alerta de guardado fue exitosa.");            
          assert.equal (await billingPage.alert.getText(),"The address has been saved.", "Error: pagina no coincide.");
          await loginpage.logout();

    })
    ARTICULOS.forEach(({articuloCompra}) => {
        it(`Debe buscar ${articuloCompra} y comprarlo.`, async()=>
    {
        const qty = "1";
        await loginpage.login(nombreusuario,contraseñausuario);
        allure.addStep(`Buscar el Item ${articuloCompra}.`);
        await homePage.buscar(articuloCompra);
        allure.addStep("Ingresar al item.");
        await (busquedaPage.resultado).scrollIntoView();
        await busquedaPage.ingresarAlResultado(articuloCompra);
        allure.addStep("Elegir el color del item");
        await (await itemPage.colorDropdown.selectByIndex(1));
        allure.addStep("Elegir el tamaño del item");
        await (await itemPage.shoeSizedropdown).selectByIndex(1);
        allure.addStep("Elegir el la cantidad del item");
        await (await itemPage.quantityField).setValue(qty);
        allure.addStep("Añadir al carrito.");
        await itemPage.AddToCartButton.click();
        assert.exists (await checkoutPage.checkoutSuccessAlert);
        await checkoutPage.checkOutbtn.waitForDisplayed();
        allure.addStep("Seleccionar el pais para el calculo de envío.");
        await checkoutPage.countryDropdown.click();
        await (await checkoutPage.countryDropdown).selectByIndex(234);
        await (await checkoutPage.stateTextfield).scrollIntoView();
        allure.addStep("Seleccionar el estado/region para el calculo de envío.");
        await (await checkoutPage.stateTextfield).setValue(ciudad);
        await checkoutPage.cityField.click();
        allure.addStep("Seleccionar la ciudad para el calculo de envío.");
        await (await checkoutPage.cityField).setValue(ciudad);
        await checkoutPage.zipcode.click();
        allure.addStep("Seleccionar el codigo postal para el calculo de envío.");
        await (await checkoutPage.zipcode).setValue(postcode);
        allure.addStep("Clickear boton de 'estimar' para el calculo del envio.");
        await checkoutPage.estimateBtnLink.click();
        await (checkoutPage.freeshippingRdo).waitForExist();
        await (checkoutPage.freeshippingRdo).scrollIntoView();
        allure.addStep("Seleccionar la opcion de envio gratis.");
        await checkoutPage.freeshippingRdo.click();
        allure.addStep("Seleccionar el boton de Update Total");
        await checkoutPage.updateTotalBtn.click();
        allure.addStep("Seleccionar el boton de Checkout.");
        await checkoutPage.checkOutbtn.click();
        allure.addStep("Validar que existe el botón de continue de Billing y clickearlo");
        assert.exists(await checkoutPage.billing1ContinueBtn);
        await checkoutPage.billing1ContinueBtn.waitForDisplayed();
        await checkoutPage.billingThisAdressRdio.click();
        await checkoutPage.billing1ContinueBtn.click();
        allure.addStep("Validar que existe el botón de continue de Shipping y clickearlo");
        await checkoutPage.billing3ShippingContinueBtn.waitForDisplayed();
        assert.equal(await checkoutPage.billingGiftAdvice.getText(),"DO YOU HAVE ANY GIFT ITEMS IN YOUR ORDER?","Error, no se encontró este texto.")
        await checkoutPage.billing3ShippingContinueBtn.click();
        allure.addStep("Seleccionar opcion de dinero en entrega y continuar.");
        await checkoutPage.billingPaymentCashRdio.waitForDisplayed();
        await checkoutPage.billingPaymentCashRdio.click();
        await checkoutPage.billing4PaymentContinueBtn.click();
        allure.addStep("Esperar que se habilite el boton de Place Order y clickearlo.");
        await checkoutPage.placeOrderBtn.waitForDisplayed();
        await checkoutPage.placeOrderBtn.click();
        allure.addStep("Esperar para Leer que la orden quedó hecha.");
        await checkoutPage.continueShoppingBtn.waitForDisplayed();
        assert.equal(await homePage.Header1.getText(),"YOUR ORDER HAS BEEN RECEIVED.", "Error: La orden no fue realizada.");
        await loginpage.logout();
    });   
    });

});
