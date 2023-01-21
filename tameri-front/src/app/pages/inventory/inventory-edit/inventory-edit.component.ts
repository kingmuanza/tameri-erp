import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Inventory } from 'src/app/_models/inventory.model';
import { Inventorygroup } from 'src/app/_models/inventorygroup.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resources = new Array<Resource>();
  inventories = new Array<Inventory>();
  company = new Company();

  showWaitingMessage = false;

  constructor(
    private router: Router,
    private resourceService: CrudService<Resource>,
    private inventoryService: CrudService<Inventory>,
    private inventorygroupService: CrudService<Inventorygroup>,
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
      this.createInventories().then(() => {
        this.dtTrigger.next('');
      });
    }).catch((e) => {
      this.dtTrigger.next('');
    });
  }

  getResourceItems(resource: Resource) {
    return this.recurrentService.getResourceItems(resource);
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
      this.saveOne(resource, elem).then(() => {
        window.location.reload();
      });
    }
  }

  saveOne(resource: Resource, elem: any) {
    return new Promise((resolve, reject) => {
      const inventory = new Inventory();
      inventory.resource = resource;
      console.log(elem.value);
      inventory.quantity = Number(elem.value);
      inventory.company = this.company;
      inventory.date = new Date()
      console.log(inventory);
      this.inventoryService.create('inventory', inventory).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        resolve(inventory);
      });
    });
  }

  createInventory(resource: Resource) {
    const inventory = new Inventory();
    inventory.resource = resource;
    inventory.quantity = 0;
    inventory.company = this.company;
    inventory.date = new Date()
    console.log(inventory);
    return inventory;
  }

  async createInventories() {
    for (let index = 0; index < this.resources.length; index++) {
      const resource = this.resources[index];
      await new Promise((r) => setTimeout(r, 100));
      const inventory = this.createInventory(resource);
      this.inventories.push(inventory);
    }
  }

  saveAll() {
    const yes = confirm('Are you sure to update those values ?');
    if (yes) {
      this.showWaitingMessage = true;
      this.saveGlobalInventory().then(() => {
        this.showWaitingMessage = false;
        this.notifierService.notify('success', "saved successfully");
        window.location.reload();
      });
    }
  }

  getInventoryQuantity(inventory: Inventory):number {
    return inventory.whole * inventory.resource.content + inventory.opened;
  }

  async saveGlobalInventory() {
    console.log(this.inventories);
    const inventorygroup = new Inventorygroup();
    inventorygroup.date = new Date();
    inventorygroup.company = this.company;
    const _id = await this.inventorygroupService.create('inventorygroup', inventorygroup);
    inventorygroup._id = _id;
    
    for (let index = 0; index < this.inventories.length; index++) {
      const inventory = this.inventories[index];
      inventory.inventorygroup = inventorygroup;
      inventory.quantity = this.getInventoryQuantity(inventory);
      await this.inventoryService.create('inventory', inventory)
    }
    
    console.log(_id);
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
