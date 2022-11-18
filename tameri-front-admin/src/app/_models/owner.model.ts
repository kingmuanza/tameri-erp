import { Contact } from "./contact.model";

export class Owner {
    id: string = 'OWNER' + new Date().getTime();
    names = '';
    position = '';
    contact = new Contact();
    login = '';
    password = '';
}