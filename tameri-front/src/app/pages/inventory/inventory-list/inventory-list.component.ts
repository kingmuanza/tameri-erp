import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Inventory } from 'src/app/_models/inventory.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

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
    private inventoryService: CrudService<Inventory>,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private recurrentService: RecurrentService,
  ) {
    this.company = this.authService.user.company;
  }

  edit(resource?: Resource) {
    if (resource) {
      this.router.navigate(['resource', 'view', resource._id]);
    } else {
      this.router.navigate(['resource', 'edit']);
    }
  }

  ngOnInit(): void {
    this.resourceService.getAll('resource').then((data) => {
      this.resources = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    }).catch((e) => {
      this.dtTrigger.next('');
    });
  }

  getResourceItems(resource: Resource) {
    return this.recurrentService.getResourceItems(resource);
  }
  
  getResourceUsedItems(resource: Resource) {
    return this.recurrentService.getResourceUsedItems(resource);
  }

  getProductItems(resource: Resource) {
    return this.recurrentService.getProductItems(resource);
  }

  calculTotalResourceitems(resourceitems: Array<Resourceitem>) {
    return this.recurrentService.calculTotalResourceitems(resourceitems);
  }

  saveInventory(resource: Resource, elem: any) {
    const yes = confirm('Are you sure to update this value ?');
    if (yes) {
      const inventory = new Inventory();
      inventory.resource = resource;
      console.log(elem.value);
      inventory.quantity = Number(elem.value);
      inventory.company = this.company;
      inventory.date = new Date()
      console.log(inventory);
      this.inventoryService.create('inventory', inventory).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        window.location.reload();
      });
    }
  }

  getLastInventory(resource: Resource): Inventory {
    return this.recurrentService.getLastInventory(resource);
  }

  getNow(resource: Resource) {
    return this.recurrentService.getNow(resource);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
