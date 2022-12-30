import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Client } from 'src/app/_models/client.model';
import { Clientgroup } from 'src/app/_models/clientgroup.model';
import { Company } from 'src/app/_models/company.model';
import { Order } from 'src/app/_models/order.model';
import { Orderline } from 'src/app/_models/orderline.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { Sale } from 'src/app/_models/sale.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  orderlines = new Array<Orderline>();
  sales = new Array<Sale>();
  clients = new Array<Client>();

  bills = new Array<Order>();
  productpacks = new Array<Productpack>();
  company = new Company();

  orderline = new Orderline();

  TOTAL = 0;
  TOTALSALE = 0;

  code = '';
  order = new Order(new Company());

  isView = false;
  isClient = false;

  billUse = new Order(new Company());

  client = new Client();

  quantityCurrent = 0;
  sale: Sale | undefined;

  constructor(
    private orderService: CrudService<Order>,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private billService: CrudService<Sale>,
    private clientgroupService: CrudService<Clientgroup>,
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
        this.orderService.get('order', id).then((data) => {
          this.order = data;
          this.TOTAL = this.getTotalBill();
          this.billService.getAll('bill').then((data) => {
            this.sales = data.filter((d) => {
              return d.order && d.order.id === this.order.id;
            });
          })
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
      action: function () {
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
    this.orderService.modify('order', order._id, order).then(() => {
      this.notifierService.notify('success', "saved successfully");
    });
  }

  getTotal(orderline: Orderline): number {
    return orderline.productpack.price * orderline.quantity;
  }

  getTotalSaleline(saleline: Saleline): number {
    return saleline.productpack.price * saleline.quantity;
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
    this.orderService.modify('order', bill._id, bill).then(() => {
      this.notifierService.notify('success', "saved successfully");
    }).catch(() => {
    });
  }

  setPaid(bill: Order) {
    bill.good = true;
    this.orderService.modify('order', bill._id, bill).then(() => {
      this.notifierService.notify('success', "saved successfully");
    }).catch(() => {
    });
  }

  setNotPaid(bill: Order) {
    bill.good = false;
    this.orderService.modify('order', bill._id, bill).then(() => {
      this.notifierService.notify('success', "saved successfully");
    }).catch(() => {
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

  generateInvoice(order: Order) {
    const yes = confirm('Are you sure to generate invoice ?');
    if (yes) {
      this.orderToSale(order).then((sale) =>  {
        this.saveInvoice(sale);
      });
    }
  }

  getQuantityDelivered(orderline: Orderline): number {
    let resultat = 0;
    this.sales.forEach((sale) => {
      sale.salelines.forEach((saleline) => {
        if (saleline.id === orderline.id) {
          resultat += saleline.quantity;
        }
      });
    });
    return resultat;
  }

  getAmountReceived(): number {
    let resultat = 0;
    this.sales.forEach((sale) => {
      resultat += sale.paid;
    });
    return resultat;
  }

  saveInvoice(sale: Sale) {
    console.log(sale);
    sale.order = this.order;
    if (sale.paid <= this.TOTALSALE - sale.reduction) {
      this.billService.create('bill', sale).then(() => {
        this.notifierService.notify('success', "Invoice successfully created");
        window.location.reload();
      }).catch(() => {
      });
    } else {
      this.notifierService.notify('error', "The amount is under the net payable");
    }
  }

  cancelPartialInvoice() {
    this.sale = undefined;
  }

  generatePartialInvoice(order: Order) {
    this.orderToSale(order).then((sale) => {
      this.sale = sale;
    });
  }

  calculerTotalSale() {
    setTimeout(() => {
      this.TOTALSALE = 0;
      if (this.sale) {
        this.sale.salelines.forEach((element) => {
          this.TOTALSALE += this.getTotalSaleline(element);
        });
        this.calculReductionClient(this.sale).then((reduction) => {
          if (this.sale) {
            this.sale.reduction = reduction;
            this.sale.paid = this.TOTALSALE - this.sale.reduction;
          }
        });
      }
    }, 500);
  }

  calculReductionClient(sale: Sale): Promise<number> {
    return new Promise((resolve) => {
      const client = sale.client;
      let reduction = 0;
      if (client) {
        console.log('client ' + client.firstname);
        let group = client.group;
        if (group) {
          console.log('group ' + group.name);
          this.clientgroupService.get('clientgroup', group._id).then((data) => {
            group = data;
            if (group.reductionglobale > 0) {
              console.log('reductionglobale ' + group.reductionglobale);
              reduction = (group.reductionglobale / 100) * this.TOTALSALE;
            } else {
              console.log('pas de rreductionglobale ');
              reduction = 0;
              sale.salelines.forEach((orderline) => {
                reduction += this.calculReductionIntermediaire(group, orderline);
              });
            }
            resolve(reduction);
          });
        }
      } else {
        resolve(0);
      }
    });
  }

  calculReductionIntermediaire(clientgroup: Clientgroup, orderline: Saleline): number {
    console.log('calculReductionIntermediaire');
    let reductionIntermediaire = 0;
    if (clientgroup.reductionsParProduit) {
      if (clientgroup.reductionsParProduit.length > 0) {
        clientgroup.reductionsParProduit.forEach((element) => {
          if (element.product.id === orderline.productpack.product.id) {
            reductionIntermediaire = (element.reduction / 100) * orderline.productpack.quantity * orderline.productpack.product.price * orderline.quantity;
          }
        });
      }
    }
    console.log(reductionIntermediaire);
    return reductionIntermediaire;
  }

  orderToSale(order: Order): Promise<Sale> {
    return new Promise((resolve) => {
      const sale = new Sale(this.company);
      sale.good = order.good;
      sale.delivery = order.delivery;
      sale.deliveryDate = order.deliveryDate;
      sale.reduction = order.reduction;
      sale.client = order.client;
      sale.order = order;
      sale.code = sale.id;
      sale.paid = 0;
      order.orderlines.forEach(orderline => {
        const saleline = new Saleline();
        saleline.id = orderline.id;
        saleline.productpack = orderline.productpack;
        saleline.quantity = orderline.quantity - this.getQuantityDelivered(orderline);
        sale.salelines.push(saleline);
      });
  
      sale.salelines.forEach((element) => {
        this.TOTALSALE += this.getTotalSaleline(element);
      });
      this.calculReductionClient(sale).then((reduction) => {
        sale.reduction = reduction;
        sale.paid = this.TOTALSALE - sale.reduction;
        resolve(sale);
      });
  
    });

  }

  delete(bill: Order) {
    const yes = confirm('Are you sure to cancel this order ?');
    if (yes) {
      this.orderService.delete('order', bill._id).then(() => {
        this.notifierService.notify('success', "Delete successfully");
        this.router.navigate(['bill']);
      }).catch(() => {
      });
    }
  }
}
