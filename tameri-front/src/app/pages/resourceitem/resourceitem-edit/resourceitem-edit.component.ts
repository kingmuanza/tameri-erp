import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcepack } from 'src/app/_models/resourcepack.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourceitem-edit',
  templateUrl: './resourceitem-edit.component.html',
  styleUrls: ['./resourceitem-edit.component.scss']
})
export class ResourceitemEditComponent implements OnInit {

  resourceitem = new Resourceitem();
  isNewResourceitem = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();

  suppliers = new Array<Supplier>();
  resources = new Array<any>();
  resourcepacks = new Array<any>();

  type = 'resource';
  showErrors = false;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourcepackService: CrudService<Resourcepack>,
    private companyService: CrudService<Company>,
    private supplierService: CrudService<Supplier>,
    private resourceService: CrudService<Resource>,
    private resourceitemService: CrudService<Resourceitem>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.resourcepackService.getAll('resourcepack').then((data) => {
      this.resourcepacks = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.supplierService.getAll('supplier').then((data) => {
        this.suppliers = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        this.resourceService.getAll('resource').then((data) => {
          this.resources = data.filter((d) => {
            return d.company && d.company.id === this.company.id;
          });
        });
        this.company = this.authService.user.company;
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.resourceitemService.get('resourceitem', id).then((data) => {
              this.resourceitem = data;
              if (data.resourcepack) {
                this.type = 'resourcepack';
              }
              this.isNewResourceitem = false;
              this.suppliers.forEach((supplier) => {
                if (this.resourceitem.supplier && supplier.id === this.resourceitem.supplier.id) {
                  this.resourceitem.supplier = supplier;
                }
              });
              this.resources.forEach((r) => {
                if (this.resourceitem.resource && r.id === this.resourceitem.resource.id) {
                  this.resourceitem.resource = r;
                }
              });
              this.resourcepacks.forEach((r) => {
                if (this.resourceitem.resourcepack && r.id === this.resourceitem.resourcepack.id) {
                  this.resourceitem.resourcepack = r;
                }
              });
            });
          }
        });
      });
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
    });
  }

  save() {
    this.resourceitem.company = this.authService.user.company;

    if (!this.resourceitem.quantity || !(this.resourceitem.resource || this.resourceitem.resourcepack) ) {
      this.showErrors = true;
      return ;
    }
    if (this.type === 'resource') {
      this.resourceitem.resourcepack = undefined;
    }
    if (this.type === 'resourcepack') {
      this.resourceitem.resource = undefined;
    }
    if (this.isNewResourceitem) {
      this.resourceitemService.create('resourceitem', this.resourceitem).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resourceitem', 'view', _id]);
      });
    } else {
      this.resourceitemService.modify('resourceitem', this.resourceitem._id, this.resourceitem).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resourceitem', 'view', this.resourceitem._id]);
      });
    }
  }

  setPrix() {
    setTimeout(() => {
      if (this.resourceitem.resource) {
        this.resourceitem.price = this.resourceitem.resource.price * this.resourceitem.quantity;
      }
      if (this.resourceitem.resourcepack) {
        this.resourceitem.price = this.resourceitem.resourcepack.price * this.resourceitem.quantity;
      }
    }, 500);
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.resourceitemService.delete('resourceitem', this.resourceitem.id).then(() => {
        this.router.navigate(['resourceitems']);
      });
    }
  }

}
