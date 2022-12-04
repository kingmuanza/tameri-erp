import { Country } from "./country.model";

export class Contact {
    id = '';
    tel = '';
    address = '';
    email = '';
    city = '';
    street = '';
    othersTels = new Array<string>();
    othersEmail = new Array<string>();
    country = new Country();
}