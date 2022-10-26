import { Company } from "./company.model";

export class Resource {
    
    id: string = 'RESOURCE' + new Date().getTime();
    name = ''; 
    category = '';
    content = '';
    unit = '';
    price = 0;
    company = new Company();
}