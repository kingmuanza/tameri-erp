import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-resource-accumulated',
  templateUrl: './resource-accumulated.component.html',
  styleUrls: ['./resource-accumulated.component.scss']
})
export class ResourceAccumulatedComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resources = new Array<Resource>();
  company = new Company();

  constructor(
    private router: Router,
    private resourceService: CrudService<Resource>,
    private authService: AuthenticationService,
    private recurrentService: RecurrentService,
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

  edit(resource?: Resource) {
    if (resource) {
      this.router.navigate(['resource', 'view', resource._id]);
    } else {
      this.router.navigate(['resource', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.resourceService.getAll('resource').then((data) => {
      this.resources = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    }).catch((e) => {
      this.dtTrigger.next('');
    });
  }

  getResourceItems(resource: Resource): number {
    return this.recurrentService.getResourceItems(resource);
  }

  getResourceItemsNoInventory(resource: Resource): number {
    return this.recurrentService.getResourceItemsNoInventory(resource);
  }

  getResourceItemsNoInventoryValidated(resource: Resource): number {
    return this.recurrentService.getResourceItemsNoInventoryValidated(resource);
  }

  getProductItems(resource: Resource) {
    return this.recurrentService.getProductItems(resource);
  }

  calculTotalResourceitems(resourceitems: Array<Resourceitem>) {
    return this.recurrentService.calculTotalResourceitems(resourceitems);
  }

  getNow(resource: Resource) {
    return this.recurrentService.getNow(resource);
  }

  getLastInventory(resource: Resource) {
    return this.recurrentService.getLastInventory(resource);
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
