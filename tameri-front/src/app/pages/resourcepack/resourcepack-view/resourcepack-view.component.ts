import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcepack } from 'src/app/_models/resourcepack.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourcepack-view',
  templateUrl: './resourcepack-view.component.html',
  styleUrls: ['./resourcepack-view.component.scss']
})
export class ResourcepackViewComponent implements OnInit {

  step = 1;

  resourcepack = new Resourcepack();
  isNewResourcepack = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';
  resources = new Array<Resource>();

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
    private communityService: CrudService<Community>,
    private resourceService: CrudService<Resource>,
    private resourcepackService: CrudService<Resourcepack>
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourcepackService.get('resourcepack', id).then((data) => {
          this.resourcepack = data;
          this.isNewResourcepack = false;

          this.resourceService.getAll('resource').then((data) => {
            console.log('resource');
            console.log(data);
            this.resources = data.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
            this.resources.forEach((p) => {
              if (p.id === this.resourcepack.resource.id) {
                this.resourcepack.resource = p;
              }
            });
          });
        });
      }
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
    this.resourcepackService.modify('resourcepack', this.resourcepack.id, this.resourcepack).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['resourcepack', 'view', this.resourcepack.id]);
    });
  }

}
