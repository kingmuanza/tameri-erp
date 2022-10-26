import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Employee } from 'src/app/_models/employee.model';
import { CrudService } from 'src/app/_services/crud.service';
import { Community } from 'src/app/_models/community.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  step = 1;

  employee = new Employee();
  isNewEmployee = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;
  
  login = '';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private communityService: CrudService<Community>,
    private employeeService: CrudService<Employee>
  ) { }

  ngOnInit(): void {
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

  previous() {
    this.step--;
  }

  suivant() {
    this.step++;
  }

  endFirstStep() {
    this.suivant();
  }

  save() {
    this.employeeService.modify('employee', this.employee.id, this.employee).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['employee', 'view', this.employee.id]);
    });
  }

}
