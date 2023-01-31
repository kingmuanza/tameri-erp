import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/_models/company.model';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit, OnChanges {

  @Input() user: User | undefined;
  @Input() company: any;
  connexionEtablie = true;
  connexionEtablieSubscription: Subscription;

  access = {
    employee: false, 
    pos: false,
    supplier: false,
    product: {
      menu: false,
      it: false,
      pack: false,
      item: false,
      confirmation: false,
      accumulated: false,
    },
    resource: {
      menu: false,
      it: false,
      pack: false,
      item: false,
      confirmation: false,
      accumulated: false,
    },
    param: false,
    client: false,
    dashboard: false,
    order: false,
    invoice: false,
    inventory: {      
      menu: false,
      fill: false,
      analysis: false,
      history: false,
    },
  }

  isAdmin = false;

  constructor(
    private companyService: CrudService<Company>,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.connexionEtablieSubscription = this.companyService.connexionEtablieSubject.subscribe((connexionEtablie) => {
      this.connexionEtablie = connexionEtablie;
    });
    this.company = this.user?.company;
    console.log('this.company AppbarComponent');
    console.log(this.company);
    if (this.company) {
      this.getCompany(this.company);
    }
  }

  ngOnInit(): void {
    this.company = this.user?.company;
    console.log('this.company AppbarComponent');
    console.log(this.company);
    if (this.company) {
      this.getCompany(this.company);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.company = this.user?.company;    
    if (this.company) {
      this.getCompany(this.company);
    }
    console.log('this.company AppbarComponent SimpleChanges');
    console.log(this.company);
    this.getAcess();
  }

  getCompany(company: Company) {
    console.log('appbar get company...');
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
      console.log('appbar company');
      console.log(this.company.option);
    });
  }

  getAcess() {
    this.setAllFalse();
    if (this.user?.role.indexOf('ADMIN') !== -1) {
      this.isAdmin = true;
      this.access.param = true;
      this.access.resource.menu = true;
      this.access.resource.it = true;
      this.access.resource.pack = true;
      this.access.product.menu = true;
      this.access.product.it = true;
      this.access.product.pack = true;
      this.access.employee = true;
    }
    if (this.user?.role.indexOf('Manager') !== -1) {      
      this.access.dashboard = true;
      this.access.order = true;
      this.access.resource.item = true;
      this.access.inventory.menu = true;
      this.access.inventory.analysis = true;
      this.access.inventory.history = true;
      this.access.employee = true;
      this.access.supplier = true;
      this.access.client = true;
      this.access.product.menu = true;
      this.access.resource.menu = true;
      this.access.product.accumulated = true;
      this.access.resource.accumulated = true;
    }
    if (this.user?.role.indexOf('Productionman') !== -1) {
      this.access.order = true;
      this.access.client = true;
      this.access.product.menu = true;
      this.access.product.item = true;
      this.access.product.accumulated = true;
      this.access.resource.accumulated = true;
      this.access.resource.menu = true;
      // this.access.resource.item = true;
      // this.access.product.pack = true;
    }
    if (this.user?.role.indexOf('Warehouseman') !== -1) {
      this.access.resource.menu = true;
      this.access.resource.item = true;        
      this.access.resource.confirmation = true;        
      this.access.inventory.menu = true;
      this.access.inventory.fill = true;
      this.access.inventory.history = true;
    }
    if (this.user?.role.indexOf('keyAccountManager') !== -1) {
      this.access.order = true;
      this.access.client = true;
      this.access.invoice = true;
      this.access.product.menu = true;
      this.access.product.confirmation = true;
    }
    if (this.user?.role.indexOf('Cashier') !== -1) {
      this.access.dashboard = true;
      this.access.order = true;
      this.access.client = true;
      this.access.pos = true;
      this.access.invoice = true;    
    }

    console.log('this.access');
    console.log(this.access);
  }

  getNomProductsItem() {
    if (this.user?.role.indexOf('Productionman') !== -1) {
      return "Product";
    }
    return "Product Items";
  }

  signOut() {
    this.authService.deconnexion();
    this.router.navigate(['signin']).then(() => {
      window.location.reload();
    });
  }

  showLabel(role: string) {
    if (role === 'ADMIN') {
      return 'ADMIN';
    }
    if (role === 'Productionman') {
      return 'Production Man';
    }
    if (role === 'keyAccountManager') {
      return 'Key Account Manager';
    }
    return role
  }

  setAllFalse() {
    this.access = {
      employee: false, 
      pos: false,
      supplier: false,
      product: {
        menu: false,
        it: false,
        pack: false,
        item: false,
        confirmation: false,
        accumulated: false,
      },
      resource: {
        menu: false,
        it: false,
        pack: false,
        item: false,
        confirmation: false,
        accumulated: false,
      },
      param: false,
      client: false,
      dashboard: false,
      order: false,
      invoice: false,
      inventory: {      
        menu: false,
        fill: false,
        analysis: false,
        history: false,
      }
    }
  }

}
