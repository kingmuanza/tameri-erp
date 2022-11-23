import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit, OnChanges {

  @Output() onConnexion = new EventEmitter<any>();

  user: any;

  login = 'sauce';
  password = '123456';

  error = false;

  constructor(
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
