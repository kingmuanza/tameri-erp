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
    },
    param: false,
    client: false,
    dashboard: false,
    order: false,
    invoice: false,
    inventory: false,
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
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  getAcess() {
    if (this.user?.role.indexOf('ADMIN') !== -1) {
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
        },
        param: true,
        client: true,
        dashboard: true,
        order: true,
        invoice: true,
        inventory: true,
      }
    }
    if (this.user?.role.indexOf('Manager') !== -1) {
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
        },
        param: true,
        client: true,
        dashboard: true,
        order: true,
        invoice: true,
        inventory: true,
      }
    }
    if (this.user?.role.indexOf('Warehouseman') !== -1) {
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
          menu: true,
          it: false,
          pack: false,
          item: true,
        },
        param: false,
        client: false,
        dashboard: false,
        order: false,
        invoice: false,
        inventory: true,
      }
    }
    if (this.user?.role.indexOf('Productionman') !== -1) {
      this.access = {
        employee: false, 
        pos: false,
        supplier: false,
        product: {
          menu: true,
          it: false,
          pack: false,
          item: true,
        },
        resource: {
          menu: false,
          it: false,
          pack: false,
          item: false,
        },
        param: false,
        client: true,
        dashboard: false,
        order: true,
        invoice: false,
        inventory: false,
      }
    }
    if (this.user?.role.indexOf('Cashier') !== -1) {
      this.access = {
        employee: false, 
        pos: true,
        supplier: false,
        product: {
          menu: true,
          it: false,
          pack: false,
          item: true,
        },
        resource: {
          menu: false,
          it: false,
          pack: false,
          item: false,
        },
        param: false,
        client: true,
        dashboard: false,
        order: true,
        invoice: true,
        inventory: false,
      }
    }
    if (this.user?.role.indexOf('Waitress') !== -1) {
      this.access = {
        employee: false, 
        pos: true,
        supplier: false,
        product: {
          menu: true,
          it: false,
          pack: false,
          item: true,
        },
        resource: {
          menu: false,
          it: false,
          pack: false,
          item: false,
        },
        param: false,
        client: false,
        dashboard: false,
        order: false,
        invoice: false,
        inventory: false,
      }
    }

    console.log('this.access');
    console.log(this.access);
  }

  ngOnInit(): void {

  }

  signOut() {
    this.authService.deconnexion();
    this.router.navigate(['signin']);
    window.location.reload();
  }

  showLabel(role: string) {
    if (role === 'ADMIN') {
      return 'Manager';
    }
    if (role === 'Productionman') {
      return 'Production Man';
    }
    return role
  }

}
