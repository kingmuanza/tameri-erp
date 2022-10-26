import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Employee } from 'src/app/_models/employee.model';
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

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private employeeService: CrudService<Employee>
  ) { }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.employeeService.get('employee', id).then((data) => {
          this.employee = data;
          this.isNewEmployee = false;
        }); 
      }
    });
  }

  save() {
    this.employee.company = this.authService.user.company;
    if (this.isNewEmployee) {
      this.employeeService.create('employee', this.employee).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['employee', 'view', this.employee.id]);
      });
    } else {
      this.employeeService.modify('employee', this.employee.id, this.employee).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['employee', 'view', this.employee.id]);
      });
    }
  }

}
