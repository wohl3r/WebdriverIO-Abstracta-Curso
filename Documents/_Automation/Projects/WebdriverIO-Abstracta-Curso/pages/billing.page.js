import BasePage from "./base.page";

class BillingPage extends BasePage
{
    //Web Elements.
    get addressBookBtnLink(){return $('a[href$="address/"]:first-child')} //this is even more horrible, left me no choice.
    get addressChangeBtnLink(){return $('.col-1.addresses-primary > ol > li:first-of-type > p > a')} //this is the worst selector i've ever made. Sorry Lau but had to get it working.
    get saveAddressBtn(){return $('[title="Save Address"]')}
    //Insde Address Book Fields:
    get addressFirstname(){return $('#firstname')}
    get addressLastname(){return $('#lastname')}
    get addressCompany(){return $('#company')}
    get addressTelephone(){return $('#telephone')}
    get addressFax(){return $('#fax')}
    get addressStreet1(){return $('#street_1')}
    get addressStreet2(){return $('#street_2')}
    get addressCity(){return $('#city')}
    get addressStateDropdown(){return $('#region_id')}
    get addressStateTextField(){return $('#region')}
    get addressZipcode(){return $('#zip')}
    get addressCountryDropdown(){return $('#country')}
    get defaultBillingChk(){return $('#primary_billing')}
    get defaultShippingChk(){return $('#primary_shipping')}
    get alert(){return $('.success-msg > ul > li > span')}
    get billingHeader(){return $('h1')}


}
export default new BillingPage();