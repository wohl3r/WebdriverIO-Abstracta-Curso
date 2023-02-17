import BasePage from "./base.page";

class Checkout extends BasePage
{
    //Elementos Web
    get checkOutbtn(){return $('.checkout-types.bottom:last-of-type')}
    get countryDropdown(){return $('#country')} //Uruguay = 234
    get stateDropdown(){return $('#region_id')} 
    get stateTextfield(){return $('#region')}//Es untextfield para uruguay
    get cityField(){return $('#city')}
    get zipcode(){return $('#postcode')}
    get estimateBtnLink(){return $('[title="Estimate"]')}
    get freeshippingRdo(){return $('#s_method_freeshipping_freeshipping')}
    get updateTotalBtn(){return $('[title="Update Total"]')}

    get billing1ContinueBtn(){return $('[onclick="billing.save()"]')}
    get billingThisAdressRdio(){return $("//*[@id='billing:use_for_shipping_yes']")}
    get billingDifferentAdressRdio(){return $("//*[@id='billing:use_for_shipping_no']")}
    get billingAddGift(){return $('allow_gift_messages')}
    get billing3ShippingContinueBtn(){return $("[onclick='shippingMethod.save()']")}
    get billingPaymentCreditRdio(){return $('#p_method_authorizenet_directpost')}
    get billingPaymentCashRdio(){return $('#p_method_cashondelivery')}
    get billing4PaymentContinueBtn(){return $('[onclick="payment.save()"]')}
    get placeOrderBtn(){return $('[onclick="review.save();"]')}
    get checkoutSuccessAlert(){return $('.success-msg:last-of-type')}
    get billingGiftAdvice(){return $('.gift-messages h3')}
    get continueShoppingBtn(){return $('[title="Continue Shopping"]')}






}
export default new Checkout();