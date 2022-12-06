import { Company } from "./company.model";
import { Resource } from "./resource.model";

export class Product {
    
    id: string = 'PRODUCT' + new Date().getTime();
    name = ''; 
    category = '';
    content = 1;
    type = '';
    price = 0;
    warning = 0;
    now = 0;
    resources = new Array<{
        resource: Resource,
        quantity: number
    }>();
    company = new Company();
}