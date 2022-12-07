import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Purchase } from 'src/app/_models/purchase.model';
import { Resource } from 'src/app/_models/resource.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit {

  step = 1;

  resource = new Resource();
  isNewResource = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;
  company = new Company();
  login = '';


  totalPurchases = 0;
  totalItems = 0;

  purchases = new Array<Purchase>();
  productitems = new Array<Productitem>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private productitemService: CrudService<Productitem>,
    private purchaseService: CrudService<Purchase>,
    private companyService: CrudService<Company>,
    private communityService: CrudService<Community>,
    private resourceService: CrudService<Resource>
  ) {

    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourceService.get('resource', id).then((data) => {
          this.resource = data;
          this.isNewResource = false;
          this.getResourceItems();
          this.getProductItems();
        });
      }
    });
  }

  getResourceItems() {
    this.purchaseService.getAll('purchase').then((purchases) => {
      this.purchases = purchases.filter((d) => {
        const isRessource = d.resource?.id === this.resource.id;
        const isRessourcepack = d.resourcepack?.resource.id === this.resource.id;
        return isRessource || isRessourcepack;
      });
      this.totalPurchases = this.calculTotalPurchases(this.purchases) * this.resource.content;
      // this.getProductItems();
    });
  }

  getProductItems() {
    this.totalItems = 0;
    this.productitemService.getAll('productitem').then((data) => {
      this.productitems = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.productitems.forEach((d) => {
        const product = d.product;
        const productpack = d.productpack;
        if (product) {
          product.resources.forEach((r) => {
            if (r.resource.id === this.resource.id) {
              this.totalItems += d.quantity * r.quantity;
            }
          });
        }
        if (productpack) {
          productpack.product.resources.forEach((r) => {
            if (r.resource.id === this.resource.id) {
              this.totalItems += d.quantity * r.quantity * productpack.quantity;
            }
          });
        }
      });
    }).catch((e) => {
    });
  }

  calculTotalPurchases(purchases: Array<Purchase>) {
    let total = 0;
    purchases.forEach((s) => {
      if (s.resource) {
        total += s.quantity;
      }
      if (s.resourcepack) {
        total += s.quantity * s.resourcepack.quantity;
      }
    });
    return total;
  }


  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  previous() {
    this.step--;
  }

  suivant() {
    this.step++;
  }

  endFirstStep() {
    this.suivant();
  }

  save() {
    this.resourceService.modify('resource', this.resource.id, this.resource).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['resource', 'view', this.resource.id]);
    });
  }

}
