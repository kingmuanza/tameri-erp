import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  step = 1;

  product = new Product();
  isNewProduct = true;

  salelines = new Array<Saleline>();
  resources = new Array<Resource>();
  productitems = new Array<Productitem>();
  resource = new Resource();
  quantity = 1;

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

  totalSales = 0;
  totalItems = 0;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourceService: CrudService<Resource>,
    private companyService: CrudService<Company>,
    private salelineService: CrudService<Saleline>,
    private productitemService: CrudService<Productitem>,
    private productService: CrudService<Product>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.productService.get('product', id).then((data) => {
          console.log('product');
          console.log(data);
          this.product = data;
          console.log('this.product');
          console.log(this.product);
          this.isNewProduct = false;
          this.getSalelines();
          this.resourceService.getAll('resource').then((resources) => {
            this.resources = resources.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
          });
        });
      }
    });
  }

  getSalelines() {
    this.salelineService.getAll('saleline').then((salelines) => {
      this.salelines = salelines.filter((d) => {
        return d.productpack.product.id === this.product.id;
      });      
      this.totalSales = this.calculTotalSales(this.salelines);
      this.getProductItems();
    });
  }

  getProductItems() {
    this.productitemService.getAll('productitem').then((data) => {
      this.productitems = data.filter((d) => {
        const isCompany = d.company && d.company.id === this.company.id;
        const isProduit = d.product && d.product.id === this.product.id;
        return isCompany && isProduit;
      });
      this.totalItems = this.calculTotalItems(this.productitems);
      this.product.now = this.totalItems - this.totalSales;
      this.saveSilent();

    }).catch((e)=> {
    });
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
    this.productService.modify('product', this.product.id, this.product).then(() => {
      this.notifierService.notify('success', "saved successfully");
      // this.router.navigate(['product', 'view', this.product.id]);
    });
  }

  saveSilent() {
    this.productService.modify('product', this.product.id, this.product).then(() => {
      
    });
  }

  add() {
    const newResources = new Array<any>();
    let isProductAlreadyHere = false;
    if (this.resource.name && this.quantity > 0) {
      this.product.resources.forEach((item) => {
        if (item.resource.id === this.resource.id) {
          item.quantity += this.quantity;
          isProductAlreadyHere = true;
        }
        newResources.push(item);
      });
      if (!isProductAlreadyHere) {
        newResources.push({
          resource: this.resource,
          quantity: this.quantity
        });
      }
      this.product.resources = newResources;
      this.resource = new Resource();
      this.quantity = 1;
      this.showErrors = false;
      this.save();
    } else {
      this.showErrors = true;
    }
  }

  deleteResource(r: any) {
    const oui = confirm('Are you sure to delete this item ?');
    if (oui) {
      const newResources = new Array<any>();
      this.product.resources.forEach((item) => {
        if (item.resource.id !== r.resource.id) {
          newResources.push(item);
        }
      });
      this.product.resources = newResources;
      this.save();
    }
  }

  calculTotalSales(salelines: Array<Saleline>) {
    let total = 0;
    salelines.forEach((s) => {
      total += s.quantity;
    });
    return total;
  }

  calculTotalItems(productitems = new Array<Productitem>()) {
    let total = 0;
    productitems.forEach((s) => {
      total += s.quantity;
    });
    return total;
  }

}
