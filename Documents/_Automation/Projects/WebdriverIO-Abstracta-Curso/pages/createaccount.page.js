import BasePage from '../pages/base.page';
import allure from "@wdio/allure-reporter";

class CreateAccountPage extends BasePage
{
    //Elementos Web
    get firstNameField(){return $('#firstname')}
    get lastNameField(){return $('#lastname')}
    get emailAddressField(){return $('#email_address')}
    get passwordField(){return $('#password')}
    get confirmPasswordField(){return $('#confirmation')}
    get chkNewsletter(){return $('#is_subscribed')}
    get registerBtn(){return $('[title="Register"] > span')} //this is horrible
    get registerAlert(){return  $('.success-msg > ul > li > span')}
    



}
export default new CreateAccountPage();