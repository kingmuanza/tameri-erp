import { Company } from "./company.model";

export class Inventorygroup {
    id: string = 'Inventorygroup'.toUpperCase() + new Date().getTime();
    _id: any;
    date = new Date('2000-01-01');
    company = new Company()
}