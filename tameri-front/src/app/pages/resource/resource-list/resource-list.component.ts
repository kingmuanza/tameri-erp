import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resources = new Array<Resource>();
  company = new Company();

  resourceitems = new Array<Resourceitem>();
  productitems = new Array<Productitem>();

  constructor(
    private router: Router,
    private resourceService: CrudService<Resource>,
    private authService: AuthenticationService,
    private productitemService: CrudService<Productitem>,
    private resourceitemService: CrudService<Resourceitem>,
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


    this.productitemService.getAll('productitem').then((data) => {
      this.productitems = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.resourceitemService.getAll('resourceitem').then((resourceitems) => {
        this.resourceitems = resourceitems.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });

        this.dtOptions = this.initNouveau();
        this.resourceService.getAll('resource').then((data) => {
          this.resources = data.filter((d) => {
            return d.company && d.company.id === this.company.id;
          });
          this.dtTrigger.next('');
        }).catch((e) => {
          this.dtTrigger.next('');
        });
      });
    });
  }

  getResourceItems(resource: Resource) {
    const resourceitems = this.resourceitems.filter((d) => {
      const isRessource = d.resource?.id === resource.id;
      const isRessourcepack = d.resourcepack?.resource.id === resource.id;
      return isRessource || isRessourcepack;
    });
    const totalResourceitems = this.calculTotalResourceitems(resourceitems) * resource.content;
    return totalResourceitems
  }

  getProductItems(resource: Resource) {
    let totalItems = 0;
    this.productitems.forEach((d) => {
      
      const product = d.product;
      const productpack = d.productpack;
      if (product) {
        product.resources.forEach((r) => {
          if (r.resource.id === resource.id) {
            totalItems += d.quantity * r.quantity;
          }
        });
      }
      if (productpack) {
        productpack.product.resources.forEach((r) => {
          if (r.resource.id === resource.id) {
            totalItems += d.quantity * r.quantity * productpack.quantity;
          }
        });
      }
    });
    return totalItems;
  }

  calculTotalResourceitems(resourceitems: Array<Resourceitem>) {
    let total = 0;
    resourceitems.forEach((s) => {
      if (s.resource) {
        total += s.quantity;
      }
      if (s.resourcepack) {
        total += s.quantity * s.resourcepack.quantity;
      }
    });
    return total;
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
