import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Employee } from 'src/app/_models/employee.model';
import { Position } from 'src/app/_models/position.model';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employee = new Employee();
  isNewEmployee = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();
  showError = false;
  password = '';
  telAlreadyUse = false;
  positions = new Array<Position>();

  constructor(
    private router: Router,
    private companyService: CrudService<Company>,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private positionService: CrudService<Position>,
    private employeeService: CrudService<Employee>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.positionService.getAll('position').then((data) => {
      this.positions = data;
    });
    this.getCompany(this.company);
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.employeeService.get('employee', id).then((data) => {
          this.employee = data;
          this.isNewEmployee = false;
          this.password = this.employee.password;
          
          this.positions.forEach((p) => {
            if (this.employee.position && p.id === this.employee.position.id) {
              this.employee.position = p;
            }
          });
        });
      }
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
    });
  }

  isACLValide(acl: string): boolean {
    let resultat = true;
    if (acl === 'Restau') {
      resultat = this.company.option.restau;
    }
    if (acl === 'Bar') {
      resultat = this.company.option.bar;
    }
    if (acl === 'Shop') {
      resultat = this.company.option.shop;
    }
    if (acl === 'Service') {
      resultat = this.company.option.prestationservice;
    }
    if (acl === 'Personnalized') {
      resultat = this.company.option.personnalized;
    }
    return resultat;
  }

  verifyForm() {
    this.showError = true;
    return this.employee.names && this.employee.tel && this.employee.password && this.password && this.password === this.employee.password;
  }

  save() {
    console.log('Création dun employee');
    console.log(this.employee);
    this.showError = false;
    const resultVerifiy = this.verifyForm();
    console.log('resultVerifiy');
    console.log(resultVerifiy);
    if (!resultVerifiy) {
      return
    }
    this.employee.company = this.authService.user.company;
    this.employee.login = this.employee.tel;

    this.createUser(this.employee).then((user) => {
      this.employee.userID = user._id;
      if (this.isNewEmployee) {
        this.employeeService.create('employee', this.employee).then((_id) => {
          this.notifierService.notify('success', "saved successfully");
          this.router.navigate(['employee', 'view', _id]);
        });
      } else {
        this.employeeService.modify('employee', this.employee.id, this.employee).then(() => {
          this.notifierService.notify('success', "saved successfully");
          this.router.navigate(['employee', 'view', this.employee._id]);
        });
      }
    });
  }

  modify() {
    this.showError = false;
    const resultVerifiy = this.verifyForm();
    console.log('resultVerifiy');
    console.log(resultVerifiy);
    if (!resultVerifiy) {
      return
    }
    this.updateUser(this.employee).then(() => {
      this.employeeService.modify('employee', this.employee._id, this.employee).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['employee', 'view', this.employee._id]);
      });
    });
  }

  updateUser(employee: Employee): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = new User(this.company, employee);
      console.log('user to update');
      console.log(user);
      user._id = employee.userID;
      console.log(user);
      this.authService.updateUser(user).then(() => {
        this.notifierService.notify('success', "User update successfully " + user._id);
        resolve(user);
      });
    });
  }

  createUser(employee: Employee): Promise<User> {
    console.log('Création dun utilistauer');
    this.telAlreadyUse = false;
    return new Promise((resolve, reject) => {
      const user = new User(this.company, employee);
      user.password = this.password;
      console.log(('user'));
      console.log(user);
      this.authService.createUser(user).then((_id) => {
        this.notifierService.notify('success', "User create successfully");
        user._id = _id;
        resolve(user);
      }).catch((e) => {
        this.notifierService.notify('error', "Tel is already used");
        this.telAlreadyUse = true;
        reject(e);
      });
    });
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.employeeService.delete('employee', this.employee.id).then(() => {
        this.router.navigate(['employee']);
      });
    }
  }
}
