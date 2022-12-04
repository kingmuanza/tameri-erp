import { Client } from "./client.model";
import { Company } from "./company.model";
import { Saleline } from "./saleline.model";

export class Sale {
    id: string = 'SALE' + new Date().getTime();
    date = new Date();
    code = '';
    salelines = new Array<Saleline>();
    company = new Company();
    good = false;
    client = new Client();

    constructor(company: Company) {
        this.company.id = company.id;
    }
}