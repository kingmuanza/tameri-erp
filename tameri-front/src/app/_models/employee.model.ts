import { Company } from "./company.model";
import { Position } from "./position.model";

export class Employee {

  id: string = 'EMPLOYEE' + new Date().getTime();
  names = '';
  tel = '';
  email = '';
  position = new Position();
  role = [''];
  acl = '';
  login = '';
  password = '';
  company = new Company();
  _id: any;
  userID: any;
}