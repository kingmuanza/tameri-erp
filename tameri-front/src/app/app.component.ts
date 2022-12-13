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
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
      this.price = this.calcul(this.company);
    });
  }

  connexion(event: any) {
    console.log('connexion');
    console.log(event);
    this.user = event;
  }

  tauxConversion(deviseEntree: string, deviseRetour: string): number {
    if (deviseRetour === 'XAF') {
      switch (deviseEntree) {
        case 'EUR': return 656.43;
        case 'USD': return 549.97;
        case 'XAF': return 1;
        case 'CAD': return 480.22;
      }
    }
    if (deviseRetour === 'EUR') {
      switch (deviseEntree) {
        case 'EUR': return 1;
        case 'USD': return 549.97 / 656.43;
        case 'XAF': return 1 / 656.43;
        case 'CAD': return 480.22 / 656.43;
      }
    }
    if (deviseRetour === 'USD') {
      switch (deviseEntree) {
        case 'EUR': return 656.43 / 549.97;
        case 'USD': return 1;
        case 'XAF': return 1 / 549.97;
        case 'CAD': return 480.22 / 549.97;
      }
    }
    if (deviseRetour === 'CAD') {
      switch (deviseEntree) {
        case 'EUR': return 656.43 / 480.22;
        case 'USD': return 549.97 / 480.22;
        case 'XAF': return 1 / 480.22;
        case 'CAD': return 1;
      }
    }
    return 1;
  }

  convertPrice(price: number, currencyIn: string, currencyOut: string) {
    return price * this.tauxConversion(currencyIn, currencyOut);
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
    return this.convertPrice(price, 'XAF', this.company.currency);
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

    this.price = this.convertPrice(price, 'XAF', this.company.currency);
  }

}
