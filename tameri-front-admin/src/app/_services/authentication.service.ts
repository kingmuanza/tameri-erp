import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  URL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) { }

  createUser(user: User) {
    console.log('createUser');
    console.log(user);
    return new Promise((resolve, reject) => {
      this.isLoginAvaible(user.login).then((avaible) => {
        if (avaible) {
          this.http.post(this.URL + 'auth/create', user).subscribe({
            next: (data) => {
              resolve(data);
            }
          });
        } else {
          reject('UNAVAIBLE');
        }
      });
    });
  }

  updateUser(user: User) {
    console.log('createUser');
    console.log(user);
    return new Promise((resolve, reject) => {
      this.http.put(this.URL + 'auth/' + user.id, user).subscribe({
        next: (data) => {
          resolve(data);
        }
      });
    });
  }

  updateUserPassword(user: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + 'auth', user).subscribe((data) => {
        resolve(data);
      });
    });
  }

  isLoginAvaible(login: string): Promise<boolean> {
    console.log('isLoginAvaible');
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + 'auth/verifylogin/' + login).subscribe((data) => {
        console.log('isLoginAvaible data ' + JSON.stringify(data));
        if(JSON.parse(JSON.stringify(data)).length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  getUser(id: number | string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL +  'auth/' + id).subscribe((data) => {
        const result = data as User;
        resolve(result);
      });
    });
  }

}
