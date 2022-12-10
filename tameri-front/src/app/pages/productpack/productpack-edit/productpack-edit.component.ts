import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productpack-edit',
  templateUrl: './productpack-edit.component.html',
  styleUrls: ['./productpack-edit.component.scss']
})
export class ProductpackEditComponent implements OnInit {

  productpack = new Productpack();
  isNewProductpack = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();
  products = new Array<Product>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>,
    private productService: CrudService<Product>,
    private productpackService: CrudService<Productpack>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.productpackService.get('productpack', id).then((data) => {
          this.productpack = data;
          this.isNewProductpack = false;

          this.productService.getAll('product').then((data) => {
            console.log('product');
            console.log(data);
            this.products = data.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
            this.products.forEach((p) => {
              if (p.id === this.productpack.product.id) {
                this.productpack.product = p;
              }
            });
          })
        });
      } else {

        this.productService.getAll('product').then((data) => {
          console.log('product');
          console.log(data);
          this.products = data.filter((d) => {
            return d.company && d.company.id === this.company.id;
          });
        })
      }
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    this.productpack.company = this.authService.user.company;
    if (this.isNewProductpack) {
      this.productpackService.create('productpack', this.productpack).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['productpack', 'view', this.productpack._id]);
      });
    } else {
      this.productpackService.modify('productpack', this.productpack._id, this.productpack).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['productpack', 'view', this.productpack._id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.productpackService.delete('productpack', this.productpack._id).then(() => {
        this.router.navigate(['productpack']);
      });
    }
  }

}
