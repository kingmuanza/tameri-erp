import { Company } from "./company.model";

export class User {
    id = '';
    name: string = '';
    login: string = '';
    password: string = '';
    role = [''];
    company = new Company();

    constructor(company: Company) {
        this.id = company.id;
        this.company = company;
        if (company.contact) {
            if (company.contact.country) {
                
            }
        }
    }
} 