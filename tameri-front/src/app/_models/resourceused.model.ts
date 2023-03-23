import { Company } from "./company.model";
import { Resource } from "./resource.model";
import { Resourceusedgroup } from "./resourceusedgroup.model";

export class Resourceused {
    id: string = 'Resourceused'.toUpperCase() + new Date().getTime();
    _id: any;
    date = new Date('2000-01-01');
    resource = new Resource();
    quantity = 0;
    whole = 0;
    opened = 0;
    company = new Company();
    resourceusedgroup = new Resourceusedgroup();
}