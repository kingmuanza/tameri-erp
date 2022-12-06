import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcetype } from 'src/app/_models/resourcetype.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourcetype-list',
  templateUrl: './resourcetype-list.component.html',
  styleUrls: ['./resourcetype-list.component.scss']
})
export class ResourcetypeListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resourcetypes = new Array<any>();
  resources = new Array<Resource>();
  company = new Company();

  constructor(
    private router: Router,
    private resourcetypeService: CrudService<Resourcetype>,
    private authService: AuthenticationService,
    private resourceService: CrudService<Resource>,
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

  edit(resourcetype?:Resourcetype) {
    if (resourcetype) {
      this.router.navigate(['parameter/resourcecategory', 'view', resourcetype.id]);
    } else {
      this.router.navigate(['parameter/resourcecategory', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.resourcetypeService.getAll('resourcetype').then((data) => {
      this.resourcetypes = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    });
  }

  getResources() {
    this.resourceService.getAll('resource').then((data) => {
      this.resources = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    }).catch((e) => {
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
