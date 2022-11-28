import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Country } from 'src/app/_models/country.model';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  step = 1;

  country = new Country();
  isNewCountry = true;

  showErrors1 = false;
  errorCountryName = false;

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
    private countryService: CrudService<Country>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.countryService.get('country', id).then((data) => {
          this.country = data;
          this.isNewCountry = false;
          this.authService.getUser(this.country.id).then((user) => {
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
    if (this.country.name && this.country.code && this.country.dial_code) {
      this.endSecondStep();
    } else {
      if (!this.country.name) {
        this.errorCountryName = true;
      }
    }
  }

  endSecondStep() {
    if (this.isNewCountry) {
      this.countryService.create('country', this.country).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/country']);
      });
    } else {
      this.countryService.modify('country', this.country.id, this.country).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/country']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.countryService.delete('country', this.country.id).then(() => {
        this.router.navigate(['parameter/country']);
      });
    }
  }

}
