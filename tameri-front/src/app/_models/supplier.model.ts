import { Company } from "./company.model";
import { Owner } from "./owner.model";

export class Supplier {
    
    id: string = 'Supplier'.toUpperCase() + new Date().getTime();
    name = '';
    tel = '';
    email = '';
    address = '';
    geolocation = '';
    owner = new Owner();
    company = new Company();
}