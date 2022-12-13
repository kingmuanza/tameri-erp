import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Client } from 'src/app/_models/client.model';
import { Sale } from 'src/app/_models/sale.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  client = new Client();
  isNewClient = true;

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  companies = new Array<any>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private saleService: CrudService<Sale>,
    private clientService: CrudService<Client>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.clientService.get('client', id).then((data) => {
          this.client = data;
          this.isNewClient = false;
          this.saleService.getAll('bill').then((data) => {
            this.companies = data.filter((sale) => {
              return sale.client && sale.client.id === this.client.id;
            });
            this.dtTrigger.next('');
          });
        });
      }
    });
  }

  save() {
    if (this.isNewClient) {
      this.clientService.create('client', this.client).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['client', 'view', this.client.id]);
      });
    } else {
      this.clientService.modify('client', this.client.id, this.client).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['client', 'view', this.client.id]);
      });
    }
  }

  viewSale(sale: Sale) {

  }

  calculTotalSalelines(salelines: Array<Saleline>) {
    let total = 0;
    salelines.forEach((s) => {      
      total += s.quantity * s.productpack.quantity * s.productpack.price;
    });
    return total;
  }

}
