import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productcategory } from 'src/app/_models/productcategory.model';
import { Producttype } from 'src/app/_models/producttype.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  product = new Product();
  isNewProduct = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();
  producttypes = new Array<any>();
  productcategorys = new Array<any>();

  units = DataService.units;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private productcategoryService: CrudService<Productcategory>,
    private producttypeService: CrudService<Producttype>,
    private productService: CrudService<Product>
  ) { }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.producttypeService.getAll('producttype').then((data) => {
      this.producttypes = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.productcategoryService.getAll('productcategory').then((data) => {
        this.productcategorys = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          console.log('id');
          console.log(id);
          if (id) {
            this.productService.get('product', id).then((data) => {
              this.product = data;
              console.log('this.product');
              console.log(data);
              this.isNewProduct = false;
              this.productcategorys.forEach((pc) => {
                if (this.product.category && pc.id === this.product.category.id) {
                  this.product.category = pc;                  
                }
              });
            }); 
          }
        });
      });
    });
  }

  save() {
   // console.log('save this.product');
    //console.log(this.product);
    this.product.company.id = this.authService.user.company.id;
    if (this.isNewProduct) {
      this.productService.create('product', this.product).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['product', 'view', _id]);
      });
    } else {
      this.productService.modify('product', this.product._id, this.product).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['product', 'view', this.product._id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.productService.delete('product', this.product.id).then(() => {
        this.router.navigate(['product']);
      });
    }
  }

}
