import { Company } from "./company.model";
import { Resource } from "./resource.model";
import { Supplier } from "./supplier.model";

export class Resourcepack {
    
    id: string = 'PRODUCTPACK' + new Date().getTime();
    name = '';
    resource = new Resource()
    quantity = 0;
    price = 0;
    company = new Company();
    supplier: Supplier | undefined;
  _id: any;

    constructor() {
        
    }
}