import { Company } from "./company.model";
import { Supplier } from "./supplier.model";

export class Resource {

    id: string = 'RESOURCE' + new Date().getTime();
    name = '';
    category = '';
    content = '';
    unit = '';
    price = 0;
    company = new Company();
    supplier: Supplier | undefined;
}