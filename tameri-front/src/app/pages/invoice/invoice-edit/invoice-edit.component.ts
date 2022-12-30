import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {

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
    private notifierService: NotifierService,
    private productpackService: CrudService<Productpack>,
    private authService: AuthenticationService,
    private clientService: CrudService<Client>,
    private salelineService: CrudService<Saleline>,
    private saleService: CrudService<Sale>,
    private productitemService: CrudService<Productitem>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.billService.get('bill', id).then((data) => {
          this.sale = data;
          this.TOTAL = this.getTotalBill();
        });
      }
    });
  }

  setDelivered(sale: Sale) {
    sale.delivery = true;
    this.saleService.modify('bill', sale._id, sale).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    });
  }

  setNotDelivered(sale: Sale) {
    sale.delivery = false;
    this.saleService.modify('bill', sale._id, sale).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    });
  }

  getTotal(saleline: Saleline): number {
    return saleline.productpack.price * saleline.quantity;
  }

  getTotalBill(): number {
    let total = 0;
    this.sale.salelines.forEach(saleline => {
      total += saleline.productpack.price * saleline.quantity;
    });
    return total;
  }

  updateTotal() {
    this.TOTAL = 0;
    this.salelines.forEach((saleline) => {
      this.TOTAL += this.getTotal(saleline);
    });
  }

  modify(bill: Sale, paid?: boolean) {
    bill.salelines = this.salelines;
    bill.good = paid ? paid : false;
    this.billService.modify('bill', bill._id, bill).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    }).catch((e) => {
    });
  }

  setPaid(bill: Sale) {
    bill.good = true;
    this.billService.modify('bill', bill._id, bill).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    }).catch((e) => {
    });
  }

  setNotPaid(bill: Sale) {
    bill.good = false;
    this.billService.modify('bill', bill._id, bill).then((data) => {
      this.notifierService.notify('success', "saved successfully");
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

  delete(bill: Sale) {
    const yes = confirm('Are you sure to cancel this order ?');
    if (yes) {
      this.billService.delete('bill', bill._id).then((data) => {
        this.notifierService.notify('success', "Delete successfully");
        this.router.navigate(['invoice']);
      }).catch((e) => {
      });
    }
  }
}
