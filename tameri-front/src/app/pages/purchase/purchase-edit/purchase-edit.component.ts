import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Purchase } from 'src/app/_models/purchase.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcepack } from 'src/app/_models/resourcepack.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {

  purchase = new Purchase();
  isNewPurchase = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();

  suppliers = new Array<Supplier>();
  resources = new Array<any>();
  resourcepacks = new Array<any>();

  type = 'resource';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourcepackService: CrudService<Resourcepack>,
    private companyService: CrudService<Company>,
    private supplierService: CrudService<Supplier>,
    private resourceService: CrudService<Resource>,
    private purchaseService: CrudService<Purchase>
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
            this.purchaseService.get('purchase', id).then((data) => {
              this.purchase = data;
              if (data.resourcepack) {
                this.type = 'resourcepack';
              }
              this.isNewPurchase = false;
              this.suppliers.forEach((supplier) => {
                if (this.purchase.supplier && supplier.id === this.purchase.supplier.id) {
                  this.purchase.supplier = supplier;
                }
              });
              this.resources.forEach((r) => {
                if (this.purchase.resource && r.id === this.purchase.resource.id) {
                  this.purchase.resource = r;
                }
              });
              this.resourcepacks.forEach((r) => {
                if (this.purchase.resourcepack && r.id === this.purchase.resourcepack.id) {
                  this.purchase.resourcepack = r;
                }
              });
            });
          }
        });
      });
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    this.purchase.company = this.authService.user.company;
    if (this.type === 'resource') {
      this.purchase.resourcepack = undefined;
    }
    if (this.type === 'resourcepack') {
      this.purchase.resource = undefined;
    }
    if (this.isNewPurchase) {
      this.purchaseService.create('purchase', this.purchase).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['purchase', 'view', this.purchase.id]);
      });
    } else {
      this.purchaseService.modify('purchase', this.purchase.id, this.purchase).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['purchase', 'view', this.purchase.id]);
      });
    }
  }

}
