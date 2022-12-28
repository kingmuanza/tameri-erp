import { Client } from "./client.model";
import { Company } from "./company.model";
import { Order } from "./order.model";
import { Saleline } from "./saleline.model";

export class Sale {
  id: string = 'SALE' + new Date().getTime();
  date = new Date();
  code = '';
  salelines = new Array<Saleline>();
  company = new Company();
  good = false;
  delivery = false;
  reduction = 0;
  client = new Client();
  _id: any;
  deliveryDate = new Date();
  order: Order;
  paid = 0;

  constructor(company: Company) {
    this.company.id = company.id;
    this.order = new Order(company);
  }
}