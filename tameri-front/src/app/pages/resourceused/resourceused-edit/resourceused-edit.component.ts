import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Resourceused } from 'src/app/_models/resourceused.model';
import { Resourceusedgroup } from 'src/app/_models/resourceusedgroup.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-resourceused-edit',
  templateUrl: './resourceused-edit.component.html',
  styleUrls: ['./resourceused-edit.component.scss']
})

export class ResourceusedEditComponent implements OnInit {
  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resources = new Array<Resource>();
  resourcesused = new Array<Resourceused>();
  company = new Company();

  showWaitingMessage = false;

  constructor(
    private router: Router,
    private resourceService: CrudService<Resource>,
    private resourceusedService: CrudService<Resourceused>,
    private resourceusedgroupService: CrudService<Resourceusedgroup>,
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
      this.createResourcesused().then(() => {
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

  saveResourceused(resource: Resource, elem: any) {
    const yes = confirm('Are you sure to update this value ?');
    if (yes) {
      this.saveOne(resource, elem).then(() => {
        window.location.reload();
      });
    }
  }

  saveOne(resource: Resource, elem: any) {
    return new Promise((resolve, reject) => {
      const resourceused = new Resourceused();
      resourceused.resource = resource;
      console.log(elem.value);
      resourceused.quantity = Number(elem.value);
      resourceused.company = this.company;
      resourceused.date = new Date()
      console.log(resourceused);
      this.resourceusedService.create('resourceused', resourceused).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        resolve(resourceused);
      });
    });
  }

  createResourceused(resource: Resource) {
    const resourceused = new Resourceused();
    resourceused.resource = resource;
    resourceused.quantity = 0;
    resourceused.company = this.company;
    resourceused.date = new Date()
    console.log(resourceused);
    return resourceused;
  }

  async createResourcesused() {
    for (let index = 0; index < this.resources.length; index++) {
      const resource = this.resources[index];
      await new Promise((r) => setTimeout(r, 100));
      const resourceused = this.createResourceused(resource);
      this.resourcesused.push(resourceused);
    }
  }

  saveAll() {
    const yes = confirm('Are you sure to update those values ?');
    if (yes) {
      this.showWaitingMessage = true;
      console.log("Saving...1.") ;
      this.saveGlobalResourceused().then(() => {
        console.log("Saving...2.") ;
        this.showWaitingMessage = false;
        this.notifierService.notify('success', "saved successfully");
        window.location.reload();
      });
    }
  }

  getResourceusedQuantity(resourceused: Resourceused):number {
    return resourceused.whole * resourceused.resource.content + resourceused.opened;
  }

  async saveGlobalResourceused() {
    console.log(this.resourcesused);
    const resourceusedgroup = new Resourceusedgroup();
    resourceusedgroup.date = new Date();
    resourceusedgroup.company = this.company;
    const _id = await this.resourceusedgroupService.create('resourceusedgroup', resourceusedgroup);
    resourceusedgroup._id = _id;
    
    for (let index = 0; index < this.resourcesused.length; index++) {
      const resourceused = this.resourcesused[index];
      resourceused.resourceusedgroup = resourceusedgroup;
      resourceused.quantity = this.getResourceusedQuantity(resourceused);
      await this.resourceusedService.create('resourceused', resourceused)
    }
    
    console.log(_id);
  }

  getLastResourceused(resource: Resource): Resourceused {
    return this.recurrentService.getLastResourceused(resource);
  }

  getNow(resource: Resource) {
    return this.recurrentService.getNow(resource);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
