import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Warehouse } from 'src/app/_models/warehouse.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  warehouses = new Array<Warehouse>();
  company = new Company();

  constructor(
    private router: Router,
    private warehouseService: CrudService<Warehouse>,
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

  edit(warehouse?:Warehouse) {
    if (warehouse) {
      this.router.navigate(['warehouse', 'view', warehouse._id]);
    } else {
      this.router.navigate(['warehouse', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.warehouseService.getAll('warehouse').then((data) => {
      this.warehouses = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    }).catch((e) => {
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
