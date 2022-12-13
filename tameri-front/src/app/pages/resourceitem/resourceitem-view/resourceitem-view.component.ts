import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { Resource } from 'src/app/_models/resource.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourceitem-view',
  templateUrl: './resourceitem-view.component.html',
  styleUrls: ['./resourceitem-view.component.scss']
})
export class ResourceitemViewComponent implements OnInit {

  step = 1;

  resourceitem = new Resourceitem();
  isNewResourceitem = true;

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
    private resourceitemService: CrudService<Resourceitem>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourceitemService.get('resourceitem', id).then((data) => {
          this.resourceitem = data;
          this.isNewResourceitem = false;
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
    this.companyService.get('company', company._id).then((data) => {
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
    this.resourceitemService.modify('resourceitem', this.resourceitem._id, this.resourceitem).then(() => {
      this.notifierService.notify('success', "saved successfully");
      // this.router.navigate(['resourceitem', 'view', this.resourceitem.id]);
    });
  }

}
