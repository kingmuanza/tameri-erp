import { Product } from "./product.model";
import { Productpack } from "./productpack.model";

export class Saleline {
    id: string = 'SALELINE' + new Date().getTime();
    productpack = new Productpack();
    quantity = 1;

}
