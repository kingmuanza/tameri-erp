import { Client } from "./client.model";
import { Company } from "./company.model";
import { Orderline } from "./orderline.model";

export class Order {
  id: string = 'Order'.toUpperCase() + new Date().getTime();
  date = new Date();
  code = '';
  orderlines = new Array<Orderline>();
  company = new Company();
  good = false;
  delivery = false;
  reduction = 0;
  client = new Client();
  _id: any;
  deliveryDate = new Date();

  constructor(company: Company) {
    this.company.id = company.id;
  }
}