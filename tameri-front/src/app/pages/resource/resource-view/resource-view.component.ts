import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit {

  step = 1;

  resource = new Resource();
  isNewResource = true;

  communities = new Array<Community>();

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


  totalResourceitems = 0;
  totalItems = 0;

  resourceitems = new Array<Resourceitem>();
  productitems = new Array<Productitem>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>,
    private recurrentService: RecurrentService,
    private resourceService: CrudService<Resource>
  ) {

    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourceService.get('resource', id).then((data) => {
          this.resource = data;
          this.isNewResource = false;
          this.getResourceItems();
          this.getProductItems();
        });
      }
    });
  }

  getResourceItems() {
    return this.recurrentService.getResourceItems(this.resource);
  }

  getProductItems() {
    return this.recurrentService.getProductItems(this.resource);
  }

  getNow() {
    return this.recurrentService.getNow(this.resource);
  }

  getLastInventory() {
    return this.recurrentService.getLastInventory(this.resource);
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    this.resourceService.modify('resource', this.resource.id, this.resource).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['resource', 'view', this.resource.id]);
    });
  }

}
