import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

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

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private productService: CrudService<Product>
  ) { }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.productService.get('product', id).then((data) => {
          this.product = data;
          this.isNewProduct = false;
        }); 
      }
    });
  }

  save() {
    this.product.company = this.authService.user.company;
    if (this.isNewProduct) {
      this.productService.create('product', this.product).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['product', 'view', this.product.id]);
      });
    } else {
      this.productService.modify('product', this.product.id, this.product).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['product', 'view', this.product.id]);
      });
    }
  }

}
