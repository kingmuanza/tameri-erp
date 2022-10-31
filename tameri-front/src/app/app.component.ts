import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from './_models/company.model';
import { AuthenticationService } from './_services/authentication.service';
import { CrudService } from './_services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tameri-front';
  user: any;
  userSubscription: Subscription;
  company: any;
  pricings = new Array<any>();
  price = 0;


  constructor(
    private authService: AuthenticationService,
    private pricingService: CrudService<any>,
    private companyService: CrudService<Company>
  ) {
    this.userSubscription = this.authService.userSubject.subscribe((user) => {
      this.user = user;
      if (user) {
        this.company = user.company;
        this.getCompany(this.company);
      }
    });
    this.authService.autoConnexion();
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
      this.price = this.calcul(this.company);
    });
  }

  connexion(event: any) {
    console.log('connexion');
    console.log(event);
    this.user = event;
  }

  
  calcul(company: Company): number {
    console.log('Calcul');
    let price = 0;
    if (company.option && company.pricing) {
      const object = JSON.parse(JSON.stringify(company.option));
      const objectPrix = JSON.parse(JSON.stringify(company.pricing));
      const keys = Object.keys(object);
      keys.forEach((key: string) => {
        price += object[key] ? objectPrix[key] : 0;
      });
    }
    return price;
  }

  updatePrice() {
    console.log('updatePrice');
    setTimeout(() => {
      this.price = this.calcul(this.company);
    }, 500);
  }

  recalculer(company: Company, ev: any) {
    console.log('recalculer');
    console.log(ev);
    let price = 0;
    if (company.option && ev) {
      this.company.pricing = ev;
      const object = JSON.parse(JSON.stringify(company.option));
      const objectPrix = JSON.parse(JSON.stringify(ev));
      const keys = Object.keys(object);
      keys.forEach((key: string) => {
        price += object[key] ? objectPrix[key] : 0;
      });
    }

    this.price = price;
  }

}
