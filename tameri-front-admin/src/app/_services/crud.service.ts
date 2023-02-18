import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  URL = 'http://192.168.8.111/api/';

  constructor(
    private http: HttpClient,
  ) {}

  infos() {
    console.log(this.URL);
  }

  showLoader() {

  }

  hideLoader() {

  }

  getAll(table: string): Promise<Array<T>> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + table).subscribe((data) => {
        const result = data as Array<T>;
        this.hideLoader();
        resolve(result);
      });
    });
  }

  get(table: string, id: number | string): Promise<T> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + table + '/' + id).subscribe((data) => {
        const result = data as T;
        this.hideLoader();
        resolve(result);
      });
    });
  }

  create(table: string, objet: T): Promise<any> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + table, objet).subscribe((data) => {
        this.hideLoader();
        resolve(data);
      });
    });
  }

  modify(table: string, id: number | string, objet: T): Promise<any> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.put(this.URL + table + '/' + id, objet).subscribe((data) => {
        const result = data as T;
        this.hideLoader();
        resolve(result);
      });
    });
  }

  delete(table: string, id: number | string): Promise<boolean> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.delete(this.URL + table + '/' + id).subscribe((data) => {
        this.hideLoader();
        resolve(true);
      });
    });
  }

}
