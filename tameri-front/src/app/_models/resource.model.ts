import { Company } from "./company.model";
import { Resourcetype } from "./resourcetype.model";
import { Supplier } from "./supplier.model";

export class Resource {

    id: string = 'RESOURCE' + new Date().getTime();
    name = '';
    category = new Resourcetype();
    content = 1;
    msl = 0;
    unit = '';
    price = 0;
    company = new Company();
    supplier: Supplier | undefined;
  _id: any;
}