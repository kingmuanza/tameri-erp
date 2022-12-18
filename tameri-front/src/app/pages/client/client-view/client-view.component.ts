import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Client } from 'src/app/_models/client.model';
import { Clientgroup } from 'src/app/_models/clientgroup.model';
import { Company } from 'src/app/_models/company.model';
import { Sale } from 'src/app/_models/sale.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
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
  groups = new Array<Clientgroup>();
  company = new Company();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private saleService: CrudService<Sale>,
    private clientgroupService: CrudService<Clientgroup>,
    private authService: AuthenticationService,
    private clientService: CrudService<Client>
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.clientgroupService.getAll('clientgroup').then((data) => {
      this.groups = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });

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
            this.groups.forEach((group) => {
              if (this.client.group.id === group.id && this.client.group) {
                this.client.group = group;
              }
            });
          });
        }
      });
    });
  }

  save() {
    if (this.isNewClient) {
      this.clientService.create('client', this.client).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['client', 'view', _id]);
      });
    } else {
      this.clientService.modify('client', this.client._id, this.client).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['client', 'view', this.client._id]);
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
