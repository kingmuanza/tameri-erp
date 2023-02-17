import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  URL = 'http://192.168.1.102/api/';

  connexionEtablie = true;
  connexionEtablieSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
  }

  infos() {
    console.log(this.configService.getUrlServeur());
  }

  showLoader() {

  }

  hideLoader() {

  }

  getAll(table: string): Promise<Array<T>> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.configService.getUrlServeur() + table).subscribe({
        next: (data) => {
          const result = data as Array<T>;
          this.hideLoader();
          this.connexionEtablieSubject.next(true);
          resolve(result);
        },
        error: (e) => {
          this.connexionEtablieSubject.next(false);
          console.log('ERREUR DE CONNEXION AU SERVEUR');
          console.log(e);
          resolve([])
        }
      });
    });
  }

  get(table: string, id: number | string): Promise<T> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.configService.getUrlServeur() + table + '/' + id).subscribe({
        next: (data) => {
          const result = data as T;
          this.hideLoader();
          resolve(result);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  create(table: string, objet: T): Promise<any> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.post(this.configService.getUrlServeur() + table, objet).subscribe({
        next: (objetUpdate) => {
          this.hideLoader();
          resolve(objetUpdate);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  modify(table: string, id: number | string, objet: T): Promise<any> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.put(this.configService.getUrlServeur() + table + '/' + id, objet).subscribe({
        next: (data) => {
          const result = data as T;
          this.hideLoader();
          resolve(result);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  delete(table: string, id: number | string): Promise<boolean> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.delete(this.configService.getUrlServeur() + table + '/' + id).subscribe({
        next: (data) => {
          this.hideLoader();
          resolve(true);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

}
