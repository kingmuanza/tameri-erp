import { Product } from "./product.model";
import { Productpack } from "./productpack.model";

export class Orderline {
    id: string = 'Orderline'.toUpperCase() + new Date().getTime();
    productpack = new Productpack();
    quantity = 1;
    saved = false;
    idorder = '';

}
