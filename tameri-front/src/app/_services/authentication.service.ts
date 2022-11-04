import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Company } from '../_models/company.model';
import { CrudService } from './crud.service';

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
    private companyService: CrudService<Company>
  ) { }


  conexion(login: string, passe: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + 'auth/connexion', { login: login, password: passe }).subscribe({
        next: (data) => {
          const result = data;
          localStorage.setItem('TameriUser', JSON.stringify(data));
          this.user = data;
          this.getCompany(this.user.company).then((company) => {
            this.user.company = company;
            this.company = company;
            this.userSubject.next(this.user);

            console.log('this.company AuthenticationService');
            console.log(this.company);
            resolve(result);
          });
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  getCompany(company: Company) {
    return new Promise((resolve, reject) => {
      this.companyService.get('company', company.id).then((data) => {
        resolve(data);
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
