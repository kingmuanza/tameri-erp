import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Companytype } from 'src/app/_models/companytype.model';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-companytype-edit',
  templateUrl: './companytype-edit.component.html',
  styleUrls: ['./companytype-edit.component.scss']
})
export class CompanytypeEditComponent implements OnInit {

  step = 1;

  companytype = new Companytype();
  isNewCompanytype = true;

  showErrors1 = false;
  errorCompanytypeName = false;

  showErrors2 = false;
  errorOwnerName = false;

  showErrors3 = false;
  errorNotSame = false;

  login = '';
  password = '';
  confirmpassword = '';

  user: User | undefined;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companytypeService: CrudService<Companytype>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.companytypeService.get('companytype', id).then((data) => {
          this.companytype = data;
          this.isNewCompanytype = false;
          this.authService.getUser(this.companytype.id).then((user) => {
            if (user) {
              this.user = user;
              this.login = user.login;
              this.password = user.password;
            }
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
    this.showErrors1 = true;
    if (this.companytype.name) {
      this.endSecondStep();
    } else {
      if (!this.companytype.name) {
        this.errorCompanytypeName = true;
      }
    }
  }

  endSecondStep() {
    if (this.isNewCompanytype) {
      this.companytypeService.create('companytype', this.companytype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/companytype']);
      });
    } else {
      this.companytypeService.modify('companytype', this.companytype.id, this.companytype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/companytype']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.companytypeService.delete('companytype', this.companytype.id).then(() => {
        this.router.navigate(['parameter/companytype']);
      });
    }
  }

}
