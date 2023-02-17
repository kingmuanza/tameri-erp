import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  urlServeur = 'http://localhost:3000/';
  laConfigurationAEteRecuperee = false;

  constructor(
    private http: HttpClient,
  ) {
    console.log("Nous sommes dans le constructeur de ConfigService");
    console.log("Ancienne urlServeur");
    console.log(this.urlServeur);
    console.log("On récupère la nouvelle urlServeur");
    this.http.get('assets/config.json').subscribe({
      next: (data: any) => {
        console.log('data from assets/config.json');
        console.log(data);
        this.urlServeur = data.protocole + '://' + data.urlServeur + ':' + data.port + '/';
        console.log('La nouvelle urlServeur est donc');
        console.log(this.urlServeur);
        setTimeout(() => {
          this.laConfigurationAEteRecuperee = true;
        }, 500);
      },
      error: (e) => {

      }
    });
  }

  getUrlServeur(): string {
    return this.urlServeur;
  }

  isLaConfigurationAEteRecuperee(): boolean {
    return this.laConfigurationAEteRecuperee;
  }
}