import { Company } from "./company.model";
import { Resource } from "./resource.model";

export class Product {
    
    id: string = 'PRODUCT' + new Date().getTime();
    name = ''; 
    category = '';
    content = '';
    type = '';
    price = 0;
    resources = new Array<{
        resource: Resource,
        quantity: number
    }>();
    company = new Company();
}