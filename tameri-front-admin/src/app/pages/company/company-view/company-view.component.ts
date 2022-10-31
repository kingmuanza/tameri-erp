import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user.model';
import { OptionPriceData } from 'src/app/_models/option.price.data.model';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  price = 0;
  step = 1;

  company = new Company();
  isNewCompany = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;
  
  user: User | undefined;
  login = '';
  pricings = new Array<any>();


  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private pricingService: CrudService<any>,
    private communityService: CrudService<Community>,
    private companyService: CrudService<Company>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.pricingService.getAll('pricing').then((data) => {
          this.pricings = data;
          this.companyService.get('company', id).then((data) => {
            this.company = data;
            this.price = this.calcul(this.company);
            this.isNewCompany = false;
  
            this.authService.getUser(this.company.id).then((user) => {
              if (user) {
                this.user = user;
              }
            }); 
  
            this.communityService.getAll('community').then((data) => {
              this.communities = data;
              this.communities.forEach((community) => {
                if (this.company.community) {
                  if (community.id === this.company.community.id) {
                    this.company.community = community;
                  }
                }
              });
              this.pricings.forEach((pricing) => {
                if (this.company.pricing) {
                  if (pricing.id === this.company.pricing.id) {
                    this.company.pricing = pricing;
                  }
                }
              });
            });
          });
        });
      }
    });
  }

  previous() {
    this.step--;
  }

  suivant() {
    this.step++;
  }

  endFirstStep() {
    this.suivant();
  }

  save() {
    this.companyService.modify('company', this.company.id, this.company).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['company', 'view', this.company.id]);
      this.price = this.calcul(this.company);
    });
  }

  savePassword() {
    this.showErrors = true;
    
    this.errorSame = false;
    this.errorSize = false;
    if (this.password === this.confirmpassword ) {
      this.updateUser();
    } else {
      this.errorSame = true;
    }

    if (this.password.length < 4) {
      this.errorSize = true;
    }
  }
  
  createUser() {
    const user = new User(this.company);
    user.login = this.login;
    user.password = this.password;
    user.role = 'ADMIN';

    this.authService.createUser(user).then(() => {
      this.notifierService.notify('success', "User create successfully");
      this.user = user;
    }).catch((e) => {
      this.notifierService.notify('error', "Login already use");
    });
  }

  updateUser() {
    const user = new User(this.company);
    user.login = this.user?  this.user.login: 'admin';
    user.password = this.password;
    user.role = 'ADMIN';
    user.company = this.company;

    this.authService.updateUser(user).then(() => {
      this.notifierService.notify('success', "User create successfully");
      this.user = user;
      this.showFormPassWord = false;

    }).catch((e) => {
      this.notifierService.notify('error', "Error");
    });
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
