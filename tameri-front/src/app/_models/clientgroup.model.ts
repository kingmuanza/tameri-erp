import { Company } from "./company.model";
import { Contact } from "./contact.model";
import { Product } from "./product.model";

export class Clientgroup {

    id: string = 'Clientgroup'.toUpperCase() + new Date().getTime();
    name = '';
    reductionglobale = 0;
    reductionsParProduit: Array<
        {
            id: string,
            product: Product,
            reduction: number
        }
    > = new Array();
    contact = new Contact();
    company = new Company();
    _id: any;
}