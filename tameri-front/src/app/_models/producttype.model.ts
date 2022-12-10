import { Company } from "./company.model";

export class Producttype {
    
    id: string = 'PRODUCTTYPE' + new Date().getTime();
    name: string = '';
    description: string = '';
    company = new Company();
  _id: any;
    
}