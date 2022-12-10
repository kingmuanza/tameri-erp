import { Company } from "./company.model";
import { Product } from "./product.model";
import { Productpack } from "./productpack.model";
import { Supplier } from "./supplier.model";

export class Productitem {

    id: string = 'Productitem'.toUpperCase() + new Date().getTime();
    date = new Date()
    quantity = 1;
    price = 0;
    company = new Company();
    product:Product | undefined;
    productpack :Productpack | undefined;
    supplier: Supplier | undefined;
  _id: any;

}