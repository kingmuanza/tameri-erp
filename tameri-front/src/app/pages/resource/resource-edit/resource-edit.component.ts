import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcetype } from 'src/app/_models/resourcetype.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss']
})
export class ResourceEditComponent implements OnInit {

  resource = new Resource();
  isNewResource = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();

  resourcetypes = new Array<any>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourcetypeService: CrudService<Resourcetype>,
    private resourceService: CrudService<Resource>
  ) { }

  ngOnInit(): void {
    this.resourcetypeService.getAll('resourcetype').then((data) => {
      this.resourcetypes = data;
    });
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourceService.get('resource', id).then((data) => {
          this.resource = data;
          this.isNewResource = false;
        }); 
      }
    });
  }

  save() {
    this.resource.company = this.authService.user.company;
    if (this.isNewResource) {
      this.resourceService.create('resource', this.resource).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resource', 'view', this.resource.id]);
      });
    } else {
      this.resourceService.modify('resource', this.resource.id, this.resource).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resource', 'view', this.resource.id]);
      });
    }
  }

}
