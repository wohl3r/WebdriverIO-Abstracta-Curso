import BasePage from '../pages/base.page';
import homePage from './home.page';
import allure from "@wdio/allure-reporter";


class LoginPage extends BasePage
{
    //Elementos Web
    get emailField(){return $('#email')}
    get passwordField(){return $('#pass')}
    get loginBtn(){return $('#send2')}
    get forgotpasswordlink(){return $('.f-left')}
    get createAccountBtn(){return $('[title="Create an Account"]')}
    

    async login(usuario,contraseña){
        await homePage.abrir('/');
        await homePage.accountMenu.click();
        allure.addStep("Clickear en el dropdown de Account");            
        await homePage.loginMenuBtn.click();
        allure.addStep("Introducir valores de Usuario y contraseña");
        await (await this.emailField).setValue(usuario);
        await (await this.passwordField).setValue(contraseña);
        allure.addStep("Entrar a la página.");
        await this.loginBtn.click();
    }

    async logout()
    {
        await homePage.accountMenu.click();
        allure.addStep("Deslogguearse.");
        await homePage.logoutMenuBtn.click();
    }

}
export default new LoginPage();