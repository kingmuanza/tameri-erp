import { Company } from "./company.model";

export class User {
    id = '';
    login: string = '';
    password: string = '';
    role = '';
    company = new Company();

    constructor(company: Company) {
        this.id = company.id;
        this.company = this.company;
    }
} 