import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Resource } from 'src/app/_models/resource.model';
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

  resources = new Array<Resource>();
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

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourceService: CrudService<Resource>,
    private companyService: CrudService<Company>,
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
          this.product = data;
          this.isNewProduct = false;
          this.resourceService.getAll('resource').then((resources) => {
            this.resources = resources.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
          })
        });
      }
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

}
