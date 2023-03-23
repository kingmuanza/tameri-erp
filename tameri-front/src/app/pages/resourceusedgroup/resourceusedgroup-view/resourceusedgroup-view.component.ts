import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-resourceusedgroup-view',
  templateUrl: './resourceusedgroup-view.component.html',
  styleUrls: ['./resourceusedgroup-view.component.scss']
})
export class ResourceusedgroupViewComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resources = new Array<Resource>();
  resourcesused = new Array<Resourceused>();
  resource = new Resource();
  company = new Company();
  resourceusedgroup = new Resourceusedgroup();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      console.log('id');
      console.log(id);
      if (id) {
        this.resourceusedgroupService.get('resourceusedgroup', id).then((data) => {
          this.resourceusedgroup = data;
          this.resourceusedService.getAll('resourceused').then((data) => {
            this.resourcesused = data.filter((d) => {
              return d.company && d.company.id === this.company.id && d.resourceusedgroup && d.resourceusedgroup.id === this.resourceusedgroup.id;
            });
            this.dtTrigger.next('');
          }).catch((e) => {
            this.dtTrigger.next('');
          });
        }); 
      }
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
      const resourceused = new Resourceused();
      resourceused.resource = resource;
      console.log(elem.value);
      resourceused.quantity = Number(elem.value);
      resourceused.company = this.company;
      resourceused.date = new Date()
      console.log(resourceused);
      this.resourceusedService.create('resourceused', resourceused).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        window.location.reload();
      });
    }
  }

  getLastResourceused(resource: Resource): Resourceused {
    return this.recurrentService.getLastResourceused(resource);
  }

  getNow(resource: Resource) {
    return this.recurrentService.getNow(resource);
  }

  viewResourceusedResource(resourceused: Resourceused) {
    this.router.navigate(['resourceused','view', resourceused.resource._id]);

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
