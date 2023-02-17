import BasePage from "./base.page";


class Item extends BasePage
{
    //elementos web
    get colorDropdown(){return $('#attribute92')}
    get shoeSizedropdown(){return $('#attribute186')}
    get sizeDropdown() {return $('#attribute180')}
    get quantityField() {return $('#qty')}
    get AddToCartButton(){return $('[title="Add to Cart"]:not(#map-popup-button)')}
    get stockTxt(){return $('.availability.in-stock > .value')} //IN STOCK
}
export default new Item();
