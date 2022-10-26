import { Company } from "./company.model";

export class Employee {
    
    id: string = 'EMPLOYEE' + new Date().getTime();
    names = '';
    tel = '';
    email = '';
    position = '';
    role = '';
    acl = '';
    login = '';
    password = '';
    company = new Company();
}