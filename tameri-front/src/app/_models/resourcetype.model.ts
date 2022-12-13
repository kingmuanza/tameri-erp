import { Company } from "./company.model";

export class Resourcetype {
    
    id: string = 'RESOURCETYPE' + new Date().getTime();
    name: string = '';
    description: string = '';
    company = new Company();
  _id: any;
    
}