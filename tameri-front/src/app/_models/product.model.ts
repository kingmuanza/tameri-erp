import { Company } from "./company.model";
import { Productcategory } from "./productcategory.model";
import { Resource } from "./resource.model";

export class Product {

    id: string = 'PRODUCT' + new Date().getTime();
    name = '';
    category = new Productcategory();
    content = 1;
    type = '';
    unit = '';
    price = 0;
    warning = 0;
    now = 0;
    resources = new Array<{
        resource: Resource,
        quantity: number,
        unit: string,
    }>();
    company = new Company();
    _id: any;
}