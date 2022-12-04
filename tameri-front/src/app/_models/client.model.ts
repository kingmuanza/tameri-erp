import { Contact } from "./contact.model";

export class Client {
    
    id: string = 'CLIENT' + new Date().getTime();
    name = '';
    firstname = '';
    contact = new Contact();
}