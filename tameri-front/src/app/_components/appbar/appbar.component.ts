import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit, OnChanges {

  @Input() user: any;
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
    param: false
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.company = this.user?.company;
    console.log('this.company AppbarComponent');
    console.log(this.company);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.company = this.user?.company;
    console.log('this.company AppbarComponent SimpleChanges');
    console.log(this.company);
    this.getAcess();
  }

  getAcess() {
    if (this.user.role === 'ADMIN') {
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
      }
    }
    if (this.user.role === 'Manager') {
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
      }
    }
    if (this.user.role === 'Warehouseman') {
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
          menu: true,
          it: false,
          pack: false,
          item: true,
        },
        param: false,
      }
    }
    if (this.user.role === 'Productionman') {
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
      }
    }
    if (this.user.role === 'Cashier') {
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
      }
    }
    if (this.user.role === 'Waitress') {
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
      }
    }
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
