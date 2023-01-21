import { Company } from "./company.model";
import { Inventorygroup } from "./inventorygroup.model";
import { Resource } from "./resource.model";

export class Inventory {
    id: string = 'Inventory'.toUpperCase() + new Date().getTime();
    _id: any;
    date = new Date('2000-01-01');
    resource = new Resource();
    quantity = 0;
    whole = 0;
    opened = 0;
    company = new Company();
    inventorygroup = new Inventorygroup();
}