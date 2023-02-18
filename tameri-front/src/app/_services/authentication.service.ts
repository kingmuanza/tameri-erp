import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Company } from '../_models/company.model';
import { User } from '../_models/user.model';
import { CrudService } from './crud.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;
  userSubject = new Subject<any>();
  company: any;

  URL = 'http://192.168.8.111/api/';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private companyService: CrudService<Company>
  ) {
  }

  conexion(login: string, passe: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.configService.getUrlServeur() + 'auth/connexion', { login: login, password: passe }).subscribe({
        next: (data) => {
          const result = data;
          console.log('data from connexion');
          console.log(data);
          if (data) {
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

          } else {
            reject('No user')
          }
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  getCompany(company: Company) {
    return new Promise((resolve, reject) => {
      this.companyService.get('company', company._id).then((data) => {
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
      this.conexion(user.login, user.password);
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

  createUser(user: User): Promise<any> {
    console.log('createUser');
    console.log(user);
    return new Promise((resolve, reject) => {
      this.isLoginAvaible(user.login).then((avaible) => {
        console.log('avaible : ' + avaible);
        if (avaible) {
          console.log('On va faire la requete post : ' + avaible);
          this.http.post(this.configService.getUrlServeur() + 'auth/create', user).subscribe({
            next: (_id) => {
              console.log('_id ');
              console.log(_id);
              resolve(_id);
            },
            error: (e) => {
              console.log('error ');
              console.log(e);
              reject(e);
            }
          });

        } else {
          reject('UNAVAIBLE');
        }
      });
    });
  }

  updateUser(user: User) {
    console.log('updateUser');
    console.log(user);
    return new Promise((resolve, reject) => {
      this.http.put(this.configService.getUrlServeur() + 'auth/' + user._id, user).subscribe({
        next: (data) => {
          resolve(data);
        }
      });
    });
  }

  isLoginAvaible(login: string): Promise<boolean> {
    console.log('isLoginAvaible');
    return new Promise((resolve, reject) => {
      this.http.get(this.configService.getUrlServeur() + 'auth/verifylogin/' + login).subscribe({
        next: (data) => {
          console.log('isLoginAvaible data ' + JSON.stringify(data));
          if (JSON.parse(JSON.stringify(data)).length > 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }

}
