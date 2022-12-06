import { Company } from "./company.model";
import { Employee } from "./employee.model";

export class User {
    
    id = '';
    name: string = '';
    acl: string = '';
    login: string = '';
    password: string = '';
    role = new Array<string>();
    company = new Company();
    locked = true

    constructor(company: Company, employee: Employee) {
        this.id = employee.id;
        this.login = company.contact.country.dial_code + employee.login;
        this.password = employee.password;
        this.company = company;
        this.role = employee.role;
        this.name = employee.names;
        this.acl = employee.acl;
    }
}