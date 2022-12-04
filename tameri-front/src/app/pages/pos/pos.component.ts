import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models/client.model';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { Sale } from 'src/app/_models/sale.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  salelines = new Array<Saleline>();
  clients = new Array<Client>();

  bills = new Array<Sale>();
  productpacks = new Array<Productpack>();
  company = new Company();

  saleline = new Saleline();

  TOTAL = 0;

  code = '';

  isView = false;
  isClient = false;

  billUse = new Sale(new Company());

  client = new Client();

  constructor(
    private billService: CrudService<Sale>,
    private productService: CrudService<Product>,
    private productpackService: CrudService<Productpack>,
    private authService: AuthenticationService,
    private clientService: CrudService<Client>,
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {

    this.clientService.getAll('client').then((data) => {
      this.clients = data;
    });
    this.productService.getAll('product').then((data) => {
      const products = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      products.forEach((p) => {
        const pp = new Productpack();
        pp.product = p;
        pp.name = p.name;
        pp.price = p.price;
        pp.quantity = 1;
        this.productpacks.push(pp);
      });
    }).catch((e) => {
    });
    this.productpackService.getAll('productpack').then((data) => {
      let productpacks = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.productpacks = this.productpacks.concat(productpacks);
    }).catch((e) => {
    });
    this.billService.getAll('bill').then((data) => {
      this.bills = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.bills = this.bills.reverse();
      this.newBill();
    }).catch((e) => {
    });
  }

  newBill() {
    this.code = this.generateCode();
    this.salelines = new Array<Saleline>();
    this.isView = false;
    this.updateTotal();

  }

  getTotal(saleline: Saleline): number {
    return saleline.productpack.price * saleline.quantity;
  }

  add(saleline: Saleline) {
    this.salelines.unshift(saleline);
    this.saleline = new Saleline();
    this.updateTotal();
  }

  updateTotal() {
    this.TOTAL = 0;
    this.salelines.forEach((saleline) => {
      this.TOTAL += this.getTotal(saleline);
    });
  }

  save(paid?: boolean) {
    const sale = new Sale(this.company);
    sale.salelines = this.salelines;
    sale.good = paid ? paid: false;
    sale.client = this.client;
    console.log('sale');
    console.log(sale);
    sale.code = this.generateCode();
    this.billService.create('bill', sale).then((data) => {
      window.location.reload();
    }).catch((e) => {
    });
  }

  modify(bill: Sale, paid?: boolean ) {
    bill.salelines = this.salelines;
    bill.good = paid ? paid: false;
    this.billService.modify('bill', bill.id, bill).then((data) => {
      window.location.reload();
    }).catch((e) => {
    });
  }

  setPaid(bill: Sale) {
    bill.good = true;
    this.billService.modify('bill', bill.id, bill).then((data) => {
      window.location.reload();
    }).catch((e) => {
    });
  }

  delete(saleline: Saleline) {
    const yes = confirm('Are you sure ?');
    if (yes) {
      this.salelines = this.salelines.filter((s) => {
        return s.id !== saleline.id;
      });
      this.updateTotal();
    }
  }

  deleteAll() {
    const yes = confirm('Are you sure ?');
    if (yes) {
      this.salelines = new Array<Saleline>();
      this.updateTotal();
    }
  }

  generateCode() {
    let n = this.bills.length + 1;
    let nombre = n + '';

    while (nombre.length < 8) {
      nombre = '0' + nombre;
    }

    return nombre;
  }

  viewBill(bill: Sale) {
    this.billUse = bill;
    this.isClient = false;
    this.code = bill.code;
    this.salelines = bill.salelines;
    this.isView = true;

    console.log('bill.client');
    console.log(bill.client);

    this.updateTotal();

    this.clients.forEach((c) => {
      if (bill.client) {
        if (c.id === bill.client.id) {
          this.client = bill.client;

          console.log('trouvé');
          console.log(this.client);
          this.isClient = true;
        }
      }
    });

  }

}