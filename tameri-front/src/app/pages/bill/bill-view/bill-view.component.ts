import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Client } from 'src/app/_models/client.model';
import { Company } from 'src/app/_models/company.model';
import { Product } from 'src/app/_models/product.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { Order } from 'src/app/_models/order.model';
import { Orderline } from 'src/app/_models/orderline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss']
})
export class BillViewComponent implements OnInit {

  orderlines = new Array<Orderline>();
  clients = new Array<Client>();

  bills = new Array<Order>();
  productpacks = new Array<Productpack>();
  company = new Company();

  orderline = new Orderline();

  TOTAL = 0;

  code = '';
  order = new Order(new Company());

  isView = false;
  isClient = false;

  billUse = new Order(new Company());

  client = new Client();

  quantityCurrent = 0;

  constructor(
    private billService: CrudService<Order>,
    private productService: CrudService<Product>,
    private notifierService: NotifierService,
    private productpackService: CrudService<Productpack>,
    private authService: AuthenticationService,
    private clientService: CrudService<Client>,
    private orderlineService: CrudService<Orderline>,
    private orderService: CrudService<Order>,
    private productitemService: CrudService<Productitem>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.initNouveau();
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.billService.get('order', id).then((data) => {
          this.order = data;
          this.TOTAL = this.getTotalBill();
        });
      }
    });
  }

  private initNouveau() {
    let dtOptions: any
    dtOptions = JSON.parse(JSON.stringify(DatatablesOptions));
    let that = this;
    let nouveau = {
      text: 'Nouveau',
      action: function (e: any, dt: any, node: any, config: any) {
        that.edit();
      },
      className: 'btn btn-primary nouveau',
    };
    dtOptions.buttons.unshift(nouveau);
    return dtOptions;
  }

  edit(order?: Order) {
    if (order) {
      this.router.navigate(['order', 'view', order._id]);
    } else {
      this.router.navigate(['order', 'edit']);
    }
  }

  setDelivered(order: Order) {
    order.delivery = true;
    this.orderService.modify('order', order._id, order).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    });
  }

  getTotal(orderline: Orderline): number {
    return orderline.productpack.price * orderline.quantity;
  }

  getTotalBill(): number {
    let total = 0;
    this.order.orderlines.forEach(orderline => {
      total += orderline.productpack.price * orderline.quantity;
    });
    return total;
  }

  updateTotal() {
    this.TOTAL = 0;
    this.orderlines.forEach((orderline) => {
      this.TOTAL += this.getTotal(orderline);
    });
  }

  modify(bill: Order, paid?: boolean) {
    bill.orderlines = this.orderlines;
    bill.good = paid ? paid : false;
    this.billService.modify('order', bill._id, bill).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    }).catch((e) => {
    });
  }

  setPaid(bill: Order) {
    bill.good = true;
    this.billService.modify('order', bill._id, bill).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    }).catch((e) => {
    });
  }

  setNotPaid(bill: Order) {
    bill.good = false;
    this.billService.modify('order', bill._id, bill).then((data) => {
      this.notifierService.notify('success', "saved successfully");
    }).catch((e) => {
    });
  }

  calculTotalOrders(orderlines: Array<Orderline>) {
    let total = 0;
    orderlines.forEach((s) => {
      
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

  delete(bill: Order) {
    const yes = confirm('Are you sure to cancel this order ?');
    if (yes) {
      this.billService.delete('order', bill._id).then((data) => {
        this.notifierService.notify('success', "Delete successfully");
        this.router.navigate(['order']);
      }).catch((e) => {
      });
    }
  }
}
