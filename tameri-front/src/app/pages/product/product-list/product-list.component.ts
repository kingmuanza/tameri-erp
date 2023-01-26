import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Employee } from 'src/app/_models/employee.model';
import { Product } from 'src/app/_models/product.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  products = new Array<Product>();
  salelines = new Array<Saleline>();
  productitems = new Array<Productitem>();
  company = new Company();

  constructor(
    private router: Router,
    private productService: CrudService<Product>,
    private authService: AuthenticationService,
    private productitemService: CrudService<Productitem>,
    private salelineService: CrudService<Saleline>,
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

  edit(product?: Product) {
    if (product) {
      this.router.navigate(['product', 'view', product._id]);
    } else {
      this.router.navigate(['product', 'edit']);
    }
  }

  ngOnInit(): void {

    this.salelineService.getAll('saleline').then((salelines) => {
      this.salelines = salelines.filter((d) => {
        return true;
      });

      this.productitemService.getAll('productitem').then((data) => {
        this.productitems = data.filter((d) => {
          const isCompany = d.company && d.company.id === this.company.id;
          return isCompany;
        });
      });

      this.dtOptions = this.initNouveau();
      this.productService.getAll('product').then((data) => {
        this.products = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        console.log('this.products');
        console.log(this.products);
        this.dtTrigger.next('');
      }).catch((e) => {
        this.dtTrigger.next('');
      });
    });
  }

  getSalelines(product: Product) {
    const salelines = this.salelines.filter((d) => {
      return d.productpack.product.id === product.id;
    });
    const totalSales = this.calculTotalSales(salelines);
    return totalSales;
    // this.getProductItems(product);
  }

  getProductItems(product: Product) {
    const productitems = this.productitems.filter((d) => {
      const isProduit = d.product && d.product.id === product.id && d.status && d.status === Productitem.CONFIRMED;
      return isProduit;
    });
    const totalItems = this.calculTotalItems(productitems);
    return totalItems;

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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
