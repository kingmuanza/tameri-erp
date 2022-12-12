import { Community } from "./community.model";
import { Contact } from "./contact.model";
import { OptionPriceData } from "./option.price.data.model";
import { OptionPrice } from "./option.price.model";
import { Owner } from "./owner.model";

export class Company {
  id: string = 'COMPANY' + new Date().getTime();
  name: string = '';
  type: string = '';

  contact = new Contact();
  geolocation: string = '';
  currency: string = 'XAF';
  owner = new Owner();

  community = new Community();

  option = new OptionPrice();

  pricing = OptionPriceData;
  _id: any;

}