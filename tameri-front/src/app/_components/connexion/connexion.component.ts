import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

  constructor(
    private authService: AuthenticationService,
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
    this.authService.conexion(this.login, this.password).then((user) => {
      console.log('user');
      console.log(user);
      this.user = user;
      this.onConnexion.emit(this.user);
    });
  }

  signOut() {
    this.authService.deconnexion();
    this.user = null;
    this.onConnexion.emit(null);
  }
}
