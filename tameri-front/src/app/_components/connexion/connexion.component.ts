import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Country } from 'src/app/_models/country.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit, OnChanges {

  @Output() onConnexion = new EventEmitter<any>();

  user: any;

  tel = '';
  login = '';
  password = '123456';

  error = false;
  errorCountry = false;
  countries = new Array<Country>();
  country: any;

  constructor(
    private countryService: CrudService<Country>,
    private authService: AuthenticationService,
    private notifierService: NotifierService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {

    this.countryService.getAll('country').then((data) => {
      this.countries = data;
    });

    let user = this.authService.autoConnexion();
    console.log('user on ConnexionComponent');
    console.log(user);
    if (user) {
      this.user = user;
      this.onConnexion.emit(this.user);
      this.login = user.login;
      this.password = user.password;
      this.signin();
    }
  }

  signin() {
    if (!this.country) {
      this.errorCountry = true;
      return ;
    }
    this.login = this.country.dial_code + this.tel;
    this.error = false;
    this.authService.conexion(this.login, this.password).then((user) => {
      console.log('user');
      console.log(user);
      this.user = user;
      this.error = false;
      this.onConnexion.emit(this.user);
    }).catch(() => {
      this.error = true;
      this.notifierService.notify('error', "Incorrect login or password");
    });
  }

  signOut() {
    this.authService.deconnexion();
    this.user = null;
    this.onConnexion.emit(null);
  }
}
