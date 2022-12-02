import { Company } from "./company.model";

export class Warehouse {
    
    id: string = 'WAREHOUSE' + new Date().getTime();
    name: string = '';
    description: string = '';
    company = new Company();
    
}