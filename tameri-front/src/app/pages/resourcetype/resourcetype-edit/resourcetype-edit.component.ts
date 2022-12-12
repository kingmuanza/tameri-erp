import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Resourcetype } from 'src/app/_models/resourcetype.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-resourcetype-edit',
  templateUrl: './resourcetype-edit.component.html',
  styleUrls: ['./resourcetype-edit.component.scss']
})
export class ResourcetypeEditComponent implements OnInit {

  step = 1;

  resourcetype = new Resourcetype();
  isNewResourcetype = true;

  showErrors1 = false;
  errorResourcetypeName = false;

  units = DataService.units;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourcetypeService: CrudService<Resourcetype>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourcetypeService.get('resourcetype', id).then((data) => {
          this.resourcetype = data;
          this.isNewResourcetype = false;
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
    this.showErrors1 = true;
    if (this.resourcetype.name) {
      this.endSecondStep();
    } else {
      if (!this.resourcetype.name) {
        this.errorResourcetypeName = true;
      }
    }
  }

  endSecondStep() {
    this.resourcetype.company.id = this.authService.user.company.id;
    if (this.isNewResourcetype) {
      this.resourcetypeService.create('resourcetype', this.resourcetype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/resourcecategory']);
      });
    } else {
      this.resourcetypeService.modify('resourcetype', this.resourcetype.id, this.resourcetype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/resourcecategory']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.resourcetypeService.delete('resourcetype', this.resourcetype._id).then(() => {
        this.router.navigate(['parameter/resourcecategory']);
      });
    }
  }

}
