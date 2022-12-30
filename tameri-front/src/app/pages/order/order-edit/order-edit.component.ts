import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/_models/client.model';
import { Clientgroup } from 'src/app/_models/clientgroup.model';
import { Company } from 'src/app/_models/company.model';
import { Order } from 'src/app/_models/order.model';
import { Orderline } from 'src/app/_models/orderline.model';
import { Product } from 'src/app/_models/product.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  orderlines = new Array<Orderline>();
  clients = new Array<Client>();

  orders = new Array<Order>();
  productpacks = new Array<Productpack>();
  company = new Company();

  orderline = new Orderline();

  TOTAL = 0;
  reduction = 0;
  netAPayer = 0;

  code = '';

  isView = false;
  isClient = false;

  orderUse = new Order(new Company());

  client = new Client();

  quantityCurrent = 0;

  deliveryDate = new Date();

  constructor(
    private orderService: CrudService<Order>,
    private productService: CrudService<Product>,
    private productpackService: CrudService<Productpack>,
    private authService: AuthenticationService,
    private router: Router,
    private clientService: CrudService<Client>,
    private orderlineService: CrudService<Orderline>,
    private clientgroupService: CrudService<Clientgroup>,
    private productitemService: CrudService<Productitem>,
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.clientService.getAll('client').then((data) => {
      this.clients = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
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
    this.orderService.getAll('order').then((data) => {
      this.orders = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.orders = this.orders.reverse();
      this.newBill();
    }).catch((e) => {
    });
  }

  newBill() {
    this.code = this.generateCode();
    this.orderlines = new Array<Orderline>();
    this.isView = false;
    this.updateTotal();

  }

  getTotal(orderline: Orderline): number {
    return orderline.productpack.price * orderline.quantity;
  }

  add(orderline: Orderline) {
    this.orderlines.unshift(orderline);
    this.orderline = new Orderline();
    this.updateTotal();
  }

  updateTotal() {
    this.TOTAL = 0;
    this.orderlines.forEach((orderline) => {
      this.TOTAL += this.getTotal(orderline);
    });
  }

  save(paid?: boolean) {
    const order = new Order(this.company);
    order.orderlines = this.orderlines;
    order.good = paid ? paid : false;
    order.client = this.client;
    order.reduction = this.reduction;
    order.deliveryDate = this.deliveryDate;
    console.log('order');
    console.log(order);
    order.code = this.generateCode();
    this.orderService.create('order', order).then((data) => {
      this.router.navigate(['order']);
    }).catch((e) => {
    });
  }

  modify(order: Order, paid?: boolean) {
    order.orderlines = this.orderlines;
    this.reduction = order.reduction;
    order.good = paid ? paid : false;
    this.orderService.modify('order', order._id, order).then((data) => {
      this.router.navigate(['order']);
    }).catch((e) => {
    });
  }

  setPaid(order: Order) {
    order.good = true;
    this.orderService.modify('order', order._id, order).then((data) => {
      window.location.reload();
    }).catch((e) => {
    });
  }

  delete(orderline: Orderline) {
    const yes = confirm('Are you sure ?');
    if (yes) {
      this.orderlines = this.orderlines.filter((s) => {
        return s.id !== orderline.id;
      });
      this.updateTotal();
    }
  }

  deleteAll() {
    const yes = confirm('Are you sure ?');
    if (yes) {
      this.orderlines = new Array<Orderline>();
      this.updateTotal();
    }
  }

  generateCode() {
    let n = this.orders.length + 1;
    let nombre = n + '';

    while (nombre.length < 8) {
      nombre = '0' + nombre;
    }

    return nombre;
  }

  viewBill(order: Order) {
    this.orderUse = order;
    this.isClient = false;
    this.code = order.code;
    this.orderlines = order.orderlines;
    this.isView = true;
    this.reduction = order.reduction ? order.reduction : 0;


    console.log('order.client');
    console.log(order.client);

    this.updateTotal();

    this.netAPayer = this.TOTAL - this.reduction;

    this.clients.forEach((c) => {
      if (order.client) {
        if (c.id === order.client.id) {
          this.client = order.client;

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
    this.getOrderlines(ev);
  }

  getOrderlines(productpack: Productpack) {
    let product = productpack.product;
    console.log('getOrderlines');
    console.log('product.id');
    console.log(product.id);
    this.orderlineService.getAll('orderline').then((orderlines) => {
      console.log(orderlines.length);
      console.log(orderlines);
      if (orderlines.length > 0) {
        orderlines = orderlines.filter((d) => {
          return d.productpack.product.id === product.id;
        });
      }
      const totalOrders = this.calculTotalOrders(orderlines);
      console.log('totalOrders : ' + totalOrders);
      this.getProductItems(product, totalOrders, productpack.quantity);
    });
  }

  getProductItems(product: Product, totalOrders: number, quantity: number) {
    console.log('getProductItems');
    this.productitemService.getAll('productitem').then((data) => {
      let productitems = data.filter((d) => {
        const isCompany = d.company && d.company.id === this.company.id;
        const isProduit = d.product && d.product.id === product.id;
        const isProduitPack = d.productpack && d.productpack.product.id === product.id;
        return isCompany && (isProduit || isProduitPack);
      });
      const totalItems = this.calculTotalItems(productitems);
      this.quantityCurrent = Math.floor((totalItems - totalOrders) / quantity);

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

  calculReductionClient(client: Client) {
    let group = client.group;
    if (group) {
      this.clientgroupService.get('clientgroup', group._id).then((data) => {
        group = data;
        if (group.reductionglobale > 0) {
          this.reduction = (group.reductionglobale / 100) * this.TOTAL;
          this.netAPayer = this.TOTAL - this.reduction;
        } else {
          this.reduction = 0;
          this.orderlines.forEach((orderline) => {
            this.reduction += this.calculReductionIntermediaire(group, orderline);
          });
          this.netAPayer = this.TOTAL - this.reduction;
        }
      });
    }
  }

  calculReductionIntermediaire(clientgroup: Clientgroup, orderline: Orderline): number {
    let reductionIntermediaire = 0;
    if (clientgroup.reductionsParProduit) {
      if (clientgroup.reductionsParProduit.length > 0) {
        clientgroup.reductionsParProduit.forEach((element) => {
          if (element.product.id === orderline.productpack.product.id) {
            reductionIntermediaire = (element.reduction/100) * orderline.productpack.quantity * orderline.productpack.product.price * orderline.quantity;
          }
        });
      }
    }
    return reductionIntermediaire;
  }

}
