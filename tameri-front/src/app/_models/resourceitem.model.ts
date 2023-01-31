import { Company } from "./company.model";
import { Resource } from "./resource.model";
import { Resourcepack } from "./resourcepack.model";
import { Supplier } from "./supplier.model";

export class Resourceitem {

  static CONFIRMED = 1;
  static NEW = 0;

  id: string = 'Resourceitem'.toUpperCase() + new Date().getTime();
  date = new Date()
  quantity = 0;
  quantityValidated = 0;
  quantityNotValidated = 0;
  price = 0;
  company = new Company();
  resource: Resource | undefined;
  resourcepack: Resourcepack | undefined;
  supplier: Supplier | undefined;
  _id: any;
  status = 0;

}