import { Company } from "./company.model";
import { Contact } from "./contact.model";
import { Owner } from "./owner.model";

export class Supplier {
    
    id: string = 'Supplier'.toUpperCase() + new Date().getTime();
    name = '';
    contact = new Contact();
    company = new Company();
  _id: any;
}