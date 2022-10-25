import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;
  userSubject = new Subject<any>();
  company: any;

  URL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) { }


  conexion(login: string, passe: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + 'auth/connexion', { login: login, password: passe }).subscribe({
        next: (data) => {
          const result = data;
          localStorage.setItem('TameriUser', JSON.stringify(data));
          this.user = data;
          this.userSubject.next(this.user);
          resolve(result);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  autoConnexion() {
    let user: any;
    const userString = localStorage.getItem('TameriUser');
    if (userString) {
      user = JSON.parse(userString);
      this.user = user;
      this.userSubject.next(this.user);
      return user;
    }
    return null;
  }

  deconnexion() {
    this.user = null;
    this.company = null;
    this.userSubject.next(null);
    localStorage.removeItem('TameriUser');
  }


}
