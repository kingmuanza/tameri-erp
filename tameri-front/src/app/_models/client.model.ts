import { Clientgroup } from "./clientgroup.model";
import { Company } from "./company.model";
import { Contact } from "./contact.model";

export class Client {

    id: string = 'CLIENT' + new Date().getTime();
    name = '';
    firstname = '';
    contact = new Contact();
    company = new Company();
    group = new Clientgroup();
    _id: any;
}