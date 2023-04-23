import { Company } from "./company.model";

export class Warehouse {
    
    id: string = 'WAREHOUSE' + new Date().getTime();
    _id: any;
    name: string = '';
    location: string = '';
    surface = 0;
    description: string = '';
    company = new Company();

}