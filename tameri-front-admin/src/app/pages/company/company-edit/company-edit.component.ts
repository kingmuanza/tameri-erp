import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Companytype } from 'src/app/_models/companytype.model';
import { Position } from 'src/app/_models/position.model';

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

  positions = new Array<Position>();

  user: User | undefined;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companytypeService: CrudService<Companytype>,
    private positionService: CrudService<Position>,
    private companyService: CrudService<Company>
  ) { }

  ngOnInit(): void {
    this.companytypeService.getAll('companytype').then((data) => {
      this.companytypes = data;
    });
    this.positionService.getAll('position').then((data) => {
      this.positions = data;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
        if (id) {
        this.companyService.get('company', id).then((data) => {
          this.company = data;
          this.isNewCompany = false;

          /* this.authService.getUser(this.company.id).then((user) => {
            if (user) {
              this.user = user;
              this.login = user.login;
              this.password = user.password;
            }
          }); */
          this.positions.forEach((p) => {
            if (this.company.owner.position && p.id === this.company.owner.position.id) {
              this.company.owner.position = p;
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
    const user = new User(this.company);
    const tel = this.company.owner.contact.tel;
    const country = this.company.owner.contact.country;
    user.login = country.dial_code + tel.split('').join('').split('-').join('');
    this.login = user.login;
    this.showErrors2 = true;
    this.errorOwnerName = false;
    if (this.company.owner.names && this.company.owner.contact.tel) {
      if (this.isNewCompany && !this.isAlreadySaved) {
        this.companyService.create('company', this.company).then((_id) => {
          this.company._id = _id;
          this.notifierService.notify('success', "Company created successfully");
          this.step++;
          if (!this.isNewCompany) {
            this.router.navigate(['company', 'view', this.company._id]);
          } else {
            this.isAlreadySaved = true;
          }
        });
      } else {
        this.companyService.modify('company', this.company._id, this.company).then(() => {
          this.notifierService.notify('success', "saved successfully");
          this.step++;
          const tel = this.company.owner.contact.tel;
          const country = this.company.owner.contact.country;
          this.login = country.dial_code + tel.split('').join('').split('-').join('');
          if (!this.isNewCompany) {
            this.router.navigate(['company', 'view', this.company._id]);
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
      user.role = ['ADMIN'];
      user.company = this.company;
      user.name = this.company.owner.names;

      this.authService.createUser(user).then(() => {
        this.notifierService.notify('success', "User create successfully");
        this.router.navigate(['company', 'view', this.company._id]);
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
      this.companyService.delete('company', this.company._id).then(() => {
        this.router.navigate(['company']);
      });
    }
  }

  getLocation() {
    const that = this;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos: any) {
      const crd = pos.coords;
      that.company.geolocation = crd.latitude + ', ' + crd.longitude;
      /* 
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`); */
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

}
