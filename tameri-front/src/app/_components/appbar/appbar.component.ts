import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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

  access = {
    employee: false, 
    pos: false,
    supplier: false,
    product: {
      menu: true,
      it: true,
      pack: true,
      item: true,
    },
    resource: {
      menu: true,
      it: true,
      pack: true,
      item: true,
      confirmation: true,
    },
    param: false,
    client: false,
    dashboard: false,
    order: false,
    invoice: false,
    inventory: {      
      menu: true,
      fill: true,
      analysis: true,
    },
  }

  constructor(
    private companyService: CrudService<Company>,
    private authService: AuthenticationService,
    private router: Router,
  ) {
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
    if (this.user?.role.indexOf('ADMIN') !== -1 || this.user?.role.indexOf('Manager') !== -1) {
      this.access = {
        employee: true,
        pos: true,
        supplier: true,
        product: {
          menu: true,
          it: true,
          pack: true,
          item: true,
        },
        resource: {
          menu: true,
          it: true,
          pack: true,
          item: true,
          confirmation: true,
        },
        param: true,
        client: true,
        dashboard: true,
        order: true,
        invoice: true,
        inventory: {      
          menu: true,
          fill: true,
          analysis: true,
        },
      }
    }
    if (this.user?.role.indexOf('Manager') !== -1) {      
      this.access.inventory.fill = false;
    }
    if (this.user?.role.indexOf('Warehouseman') !== -1) {
      this.access.resource.menu = true;
      this.access.resource.item = true;
      this.access.resource.confirmation = true;        
      this.access.inventory.menu = true;
      this.access.inventory.fill = true;
    }
    if (this.user?.role.indexOf('Productionman') !== -1) {
      this.access.product.menu = true;
      this.access.product.item = true;
      this.access.order = true;
      this.access.inventory = {      
        menu: true,
        fill: false,
        analysis: true,
      };
    }
    if (this.user?.role.indexOf('Cashier') !== -1) {
      this.access.pos = true;
      this.access.product.menu = true;
      this.access.product.item = true;
      this.access.order = true;
      this.access.invoice = true;
      this.access.client = true;
    }
    if (this.user?.role.indexOf('Waitress') !== -1) {
    }

    console.log('this.access');
    console.log(this.access);
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
      },
      resource: {
        menu: false,
        it: false,
        pack: false,
        item: false,
        confirmation: false,
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
      }
    }
  }

}
