import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/_models/client.model';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { Sale } from 'src/app/_models/sale.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})
export class BillEditComponent implements OnInit {

  salelines = new Array<Saleline>();
  clients = new Array<Client>();

  bills = new Array<Sale>();
  productpacks = new Array<Productpack>();
  company = new Company();

  saleline = new Saleline();

  TOTAL = 0;

  code = '';
  sale = new Sale(new Company());

  isView = false;
  isClient = false;

  billUse = new Sale(new Company());

  client = new Client();

  quantityCurrent = 0;

  constructor(
    private billService: CrudService<Sale>,
    private productService: CrudService<Product>,
    private productpackService: CrudService<Productpack>,
    private authService: AuthenticationService,
    private clientService: CrudService<Client>,
    private salelineService: CrudService<Saleline>,
    private saleService: CrudService<Sale>,
    private productitemService: CrudService<Productitem>,
    private route: ActivatedRoute,
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.billService.get('bill', id).then((data) => {
          this.sale = data;
        });
      }
    });
  }

  setDelivered(sale: Sale) {
    sale.delivery = true;
    this.saleService.modify('bill', sale._id, sale).then((data) => {
      
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
    sale.good = paid ? paid : false;
    sale.client = this.client;
    console.log('sale');
    console.log(sale);
    sale.code = this.generateCode();
    this.billService.create('bill', sale).then((data) => {
      window.location.reload();
    }).catch((e) => {
    });
  }

  modify(bill: Sale, paid?: boolean) {
    bill.salelines = this.salelines;
    bill.good = paid ? paid : false;
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

  verifyProductDispo(ev: any) {
    console.log('ev');
    console.log(ev);
    this.getSalelines(ev);
  }

  getSalelines(productpack: Productpack) {
    let product = productpack.product;
    console.log('getSalelines');
    console.log('product.id');
    console.log(product.id);
    this.salelineService.getAll('saleline').then((salelines) => {
      console.log(salelines.length);
      salelines = salelines.filter((d) => {
        return d.productpack.product.id === product.id;
      });
      const totalSales = this.calculTotalSales(salelines);
      console.log('totalSales : ' + totalSales);
      this.getProductItems(product, totalSales, productpack.quantity);
    });
  }

  getProductItems(product: Product, totalSales: number, quantity: number) {
    console.log('getProductItems');
    this.productitemService.getAll('productitem').then((data) => {
      let productitems = data.filter((d) => {
        const isCompany = d.company && d.company.id === this.company.id;
        const isProduit = d.product && d.product.id === product.id;
        const isProduitPack = d.productpack && d.productpack.product.id === product.id;
        return isCompany && (isProduit || isProduitPack);
      });
      const totalItems = this.calculTotalItems(productitems);
      this.quantityCurrent = Math.floor((totalItems - totalSales)/quantity);

    }).catch((e) => {
    });
  }

  calculTotalSales(salelines: Array<Saleline>) {
    let total = 0;
    salelines.forEach((s) => {
      
      total += s.quantity * s.productpack.quantity;
    });
    return total;
  }

  calculTotalItems(productitems = new Array<Productitem>()) {
    let total = 0;
    productitems.forEach((s) => {
      if (s.product) {
        total += s.quantity;
      }
      if (s.productpack) {
        total += s.quantity * s.productpack.quantity;
      }
    });
    return total;
  }

}