import { Company } from "./company.model";
import { Product } from "./product.model";

export class Productpack {
    
    id: string = 'PRODUCTPACK' + new Date().getTime();
    name = '';
    product = new Product()
    quantity = 0;
    price = 0;
    company = new Company();

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}