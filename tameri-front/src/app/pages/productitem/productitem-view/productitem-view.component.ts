import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productitem-view',
  templateUrl: './productitem-view.component.html',
  styleUrls: ['./productitem-view.component.scss']
})
export class ProductitemViewComponent implements OnInit {

  step = 1;

  productitem = new Productitem();
  isNewProductitem = true;

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
    private companyService: CrudService<Company>,
    private resourceService: CrudService<Resource>,
    private productitemService: CrudService<Productitem>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.productitemService.get('productitem', id).then((data) => {
          this.productitem = data;
          this.isNewProductitem = false;
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
    this.productitemService.modify('productitem', this.productitem.id, this.productitem).then(() => {
      this.notifierService.notify('success', "saved successfully");
      // this.router.navigate(['productitem', 'view', this.productitem.id]);
    });
  }

}
