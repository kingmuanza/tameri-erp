import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { Sale } from 'src/app/_models/sale.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Datatables
  dtOptionsOrders: any = DatatablesOptions;
  dtTriggerOrders = new Subject<any>();

  dtOptionsResources: any = DatatablesOptions;
  dtTriggerResources = new Subject<any>();

  dtOptionsResourcesItem: any = DatatablesOptions;
  dtTriggerResourcesItem = new Subject<any>();

  dtOptionsProduct: any = DatatablesOptions;
  dtTriggerProduct = new Subject<any>();

  CONFIRMED = Resourceitem.CONFIRMED;

  company = new Company();
  sales = new Array<Sale>();
  salesPaid = new Array<Sale>();
  resources = new Array<Resource>();
  resourceitems = new Array<Resourceitem>();
  products = new Array<Product>();
  productitems = new Array<Productitem>();

  constructor(
    private router: Router,
    private companyService: CrudService<Company>,
    private saleService: CrudService<Sale>,
    private authService: AuthenticationService,
    private resourceService: CrudService<Resource>,
    private resourceitemService: CrudService<Resourceitem>,
    private recurrentService: RecurrentService,
    private productService: CrudService<Product>,
    private productitemService: CrudService<Productitem>,
  ) {

    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.saleService.getAll('bill').then((data) => {
      this.sales = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.salesPaid = data.filter((d) => {
        return d.company && d.company.id === this.company.id && d.good;
      });
      this.dtTriggerOrders.next('');
    });
    this.resourceitemService.getAll('resourceitem').then((data) => {
      this.resourceitems = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTriggerResourcesItem.next('');

      this.resourceService.getAll('resource').then((data) => {
        this.resources = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        this.dtTriggerResources.next('');
      }).catch((e) => {
        this.dtTriggerResources.next('');
      });
    }).catch((e) => {
      this.dtTriggerResourcesItem.next('');
    });
    
    this.productitemService.getAll('productitem').then((data) => {
      this.productitems = data.filter((d) => {
        const isCompany = d.company && d.company.id === this.company.id;
        return isCompany;
      });
    });

    this.productService.getAll('product').then((data) => {
      this.products = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      console.log('this.products');
      console.log(this.products);
      this.dtTriggerProduct.next('');
    }).catch((e) => {
      this.dtTriggerProduct.next('');
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
    });
  }

  getTotal(sale: Sale): number {
    let total = 0;
    sale.salelines.forEach((d) => {
      total += d.quantity * d.productpack.price;
    });
    if (sale.reduction) {
      total = total - sale.reduction;
    }
    return total;
  }

  getGreatTotal(sales: Sale[]) {
    let total = 0;
    sales.forEach((sale) => {
      total += this.getTotal(sale);
    });
    return total
  }

  goToOrders() {
    this.router.navigate(['bill']);
  }

  getResourceItems(resource: Resource): number {
    return this.recurrentService.getResourceItems(resource);
  }

  getProductItems(product: Product) {
    const productitems = this.productitems.filter((d) => {
      const isProduit = d.product && d.product.id === product.id && d.status && d.status === Productitem.CONFIRMED;
      return isProduit;
    });
    const totalItems = this.calculTotalItems(productitems);
    return totalItems;
  }

  calculTotalItems(productitems = new Array<Productitem>()) {
    let total = 0;
    productitems.forEach((s) => {
      total += s.quantity;
    });
    return total;
  }

}
