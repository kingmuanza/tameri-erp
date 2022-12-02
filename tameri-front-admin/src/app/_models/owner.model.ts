import { Contact } from "./contact.model";
import { Position } from "./position.model";

export class Owner {
    id: string = 'OWNER' + new Date().getTime();
    names = '';
    position = new Position();
    contact = new Contact();
    login = '';
    password = '';
}