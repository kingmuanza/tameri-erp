import { Company } from "./company.model";
import { Resource } from "./resource.model";

export class Resourcepack {
    
    id: string = 'PRODUCTPACK' + new Date().getTime();
    name = '';
    resource = new Resource()
    quantity = 0;
    price = 0;
    company = new Company();

    constructor() {
        
    }
}