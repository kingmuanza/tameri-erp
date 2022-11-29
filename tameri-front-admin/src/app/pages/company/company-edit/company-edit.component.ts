import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Companytype } from 'src/app/_models/companytype.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  step = 1;

  company = new Company();
  isNewCompany = true;

  showErrors1 = false;
  errorCompanyName = false;

  showErrors2 = false;
  errorOwnerName = false;

  showErrors3 = false;
  errorNotSame = false;

  login = '';
  password = '';
  confirmpassword = '';

  isAlreadySaved = false;

  companytypes = new Array<Companytype>();

  user: User | undefined;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companytypeService: CrudService<Companytype>,
    private companyService: CrudService<Company>
  ) { }

  ngOnInit(): void {
    this.companytypeService.getAll('companytype').then((data) => {
      this.companytypes = data;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.companyService.get('company', id).then((data) => {
          this.company = data;
          this.isNewCompany = false;
          this.authService.getUser(this.company.id).then((user) => {
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
    if (this.company.name && this.company.currency) {
      this.suivant();
    } else {
      if (!this.company.name) {
        this.errorCompanyName = true;
      }
    }
  }

  endSecondStep() {
    this.showErrors2 = true;
    this.errorOwnerName = false;
    if (this.company.owner.names && this.company.owner.contact.tel) {
      if (this.isNewCompany && !this.isAlreadySaved) {
        this.companyService.create('company', this.company).then(() => {
          this.notifierService.notify('success', "create successfully");
          this.step++;
          if (!this.isNewCompany) {
            this.router.navigate(['company', 'view', this.company.id]);
          } else {
            this.isAlreadySaved = true;
          }
        });
      } else {
        this.companyService.modify('company', this.company.id, this.company).then(() => {
          this.notifierService.notify('success', "saved successfully");
          this.step++;
          const tel = this.company.owner.contact.tel;
          const country = this.company.owner.contact.country;
          this.login = country.dial_code + tel.split('').join('').split('-').join('');
          if (!this.isNewCompany) {
            this.router.navigate(['company', 'view', this.company.id]);
          }
        });
      }
    } else {
      if (!this.company.owner.names) {
        this.errorOwnerName = true;
      }
    }
  }

  createUser() {

    if (this.password === this.confirmpassword) {
      const user = new User(this.company);
      const tel = this.company.owner.contact.tel;
      const country = this.company.owner.contact.country;
      user.login = country.dial_code + tel.split('').join('').split('-').join('');
      this.login = user.login;
      user.password = this.password;
      user.role = 'ADMIN';
      user.company = this.company;

      this.authService.createUser(user).then(() => {
        this.notifierService.notify('success', "User create successfully");
        this.router.navigate(['company', 'view', this.company.id]);
      }).catch((e) => {
        this.notifierService.notify('error', "Login is already used");
      });
    } else {
      this.showErrors3 = true;
      this.errorNotSame = true;
    }

  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.companyService.delete('company', this.company.id).then(() => {
        this.router.navigate(['company']);
      });
    }
  }

}
