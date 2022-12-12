import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Employee } from 'src/app/_models/employee.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  employees = new Array<Employee>();
  company = new Company();

  constructor(
    private router: Router,
    private employeeService: CrudService<Employee>,
    private authService: AuthenticationService,
  ) {
    this.company = this.authService.user.company;
  }

  private initNouveau() {
    let dtOptions: any
    dtOptions = JSON.parse(JSON.stringify(DatatablesOptions));
    let that = this;
    let nouveau = {
      text: 'Nouveau',
      action: function (e: any, dt: any, node: any, config: any) {
        that.edit();
      },
      className: 'btn btn-primary nouveau',
    };
    dtOptions.buttons.unshift(nouveau);
    return dtOptions;
  }

  edit(employee?:Employee) {
    if (employee) {
      this.router.navigate(['employee', 'view', employee._id]);
    } else {
      this.router.navigate(['employee', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.employeeService.getAll('employee').then((data) => {
      this.employees = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    }).catch((e)=> {
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
