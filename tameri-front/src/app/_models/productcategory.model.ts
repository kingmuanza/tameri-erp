import { Company } from "./company.model";

export class Productcategory {
    
    id: string = 'PRODUCTCATEGORY' + new Date().getTime();
    name: string = '';
    description: string = '';
    company = new Company();
    
}