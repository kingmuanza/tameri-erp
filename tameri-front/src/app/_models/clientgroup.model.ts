import { Company } from "./company.model";
import { Contact } from "./contact.model";
import { Product } from "./product.model";

export class Clientgroup {

    id: string = 'Clientgroup'.toUpperCase() + new Date().getTime();
    name = '';
    reductionglobale = 0;
    reductionsParProduit: Array<DiscountOnProduct> = new Array();
    contact = new Contact();
    company = new Company();
    _id: any;
}

export class DiscountOnProduct {
    product=new Product();
    reduction: number = 0;
}