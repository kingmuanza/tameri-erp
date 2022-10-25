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
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];


  constructor(
    private authService: AuthenticationService,
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
    });
  }

  connexion(event: any) {
    console.log('connexion');
    console.log(event);
    this.user = event;
  }
}
