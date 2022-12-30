import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Order } from 'src/app/_models/order.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { RecurrentService } from 'src/app/_services/recurrent.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  orders = new Array<Order>();
  company = new Company();

  constructor(
    private router: Router,
    private recurrentService: RecurrentService,
    private orderService: CrudService<Order>,
    private authService: AuthenticationService,
  ) {
    this.company = this.authService.user.company;
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
    console.log('nnsqbkj');
    if (order) {
      this.router.navigate(['order', 'view', order._id]);
    } else {
      this.router.navigate(['order', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.orderService.getAll('order').then((data) => {
      this.orders = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    });
  }
  
  isOrderPaid(order: Order) {
    return this.recurrentService.isOrderPaid(order);
  }
  getTotal(order: Order): number {
    let total = 0;
    order.orderlines.forEach((d) => {
      total += d.quantity * d.productpack.price;
    });
    return total;
  }

  setDelivered(order: Order) {
    order.delivery = true;
    this.orderService.modify('order', order._id, order).then((data) => {
      
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
