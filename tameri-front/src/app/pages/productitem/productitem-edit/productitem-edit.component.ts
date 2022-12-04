import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Product } from 'src/app/_models/product.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productitem-edit',
  templateUrl: './productitem-edit.component.html',
  styleUrls: ['./productitem-edit.component.scss']
})
export class ProductitemEditComponent implements OnInit {

  productitem = new Productitem();
  isNewProductitem = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();

  suppliers = new Array<Supplier>();
  products = new Array<any>();
  productpacks = new Array<any>();

  type = 'product';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private productpackService: CrudService<Productpack>,
    private companyService: CrudService<Company>,
    private supplierService: CrudService<Supplier>,
    private productService: CrudService<Product>,
    private productitemService: CrudService<Productitem>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.productpackService.getAll('productpack').then((data) => {
      this.productpacks = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.supplierService.getAll('supplier').then((data) => {
        this.suppliers = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        this.productService.getAll('product').then((data) => {
          this.products = data.filter((d) => {
            return d.company && d.company.id === this.company.id;
          });
        });
        this.company = this.authService.user.company;
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.productitemService.get('productitem', id).then((data) => {
              this.productitem = data;
              if (data.productpack) {
                this.type = 'productpack';
              }
              this.isNewProductitem = false;
              this.suppliers.forEach((supplier) => {
                if (this.productitem.supplier && supplier.id === this.productitem.supplier.id) {
                  this.productitem.supplier = supplier;
                }
              });
              this.products.forEach((r) => {
                if (this.productitem.product && r.id === this.productitem.product.id) {
                  this.productitem.product = r;
                }
              });
              this.productpacks.forEach((r) => {
                if (this.productitem.productpack && r.id === this.productitem.productpack.id) {
                  this.productitem.productpack = r;
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
    this.productitem.company = this.authService.user.company;
    if (this.type === 'product') {
      this.productitem.productpack = undefined;
    }
    if (this.type === 'productpack') {
      this.productitem.product = undefined;
    }
    if (this.isNewProductitem) {
      this.productitemService.create('productitem', this.productitem).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['productitem', 'view', this.productitem.id]);
      });
    } else {
      this.productitemService.modify('productitem', this.productitem.id, this.productitem).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['productitem', 'view', this.productitem.id]);
      });
    }
  }

  setPrix() {
    setTimeout(() => {
      if (this.productitem.product) {
        this.productitem.price = this.productitem.product.price * this.productitem.quantity;
      }
      if (this.productitem.productpack) {
        this.productitem.price = this.productitem.productpack.price * this.productitem.quantity;
      }
    }, 500);
  }

}