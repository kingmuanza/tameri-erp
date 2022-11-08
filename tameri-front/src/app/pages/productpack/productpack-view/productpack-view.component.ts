import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productpack-view',
  templateUrl: './productpack-view.component.html',
  styleUrls: ['./productpack-view.component.scss']
})
export class ProductpackViewComponent implements OnInit {

  step = 1;

  productpack = new Productpack();
  isNewProductpack = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';
  products = new Array<Product>();

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;

  login = '';
  company = new Company();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>,
    private communityService: CrudService<Community>,
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
          });
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
    this.productpackService.modify('productpack', this.productpack.id, this.productpack).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['productpack', 'view', this.productpack.id]);
    });
  }

}
