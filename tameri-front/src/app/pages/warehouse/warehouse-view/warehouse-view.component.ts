import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Warehouse } from 'src/app/_models/warehouse.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-warehouse-view',
  templateUrl: './warehouse-view.component.html',
  styleUrls: ['./warehouse-view.component.scss']
})
export class WarehouseViewComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  companies = new Array<any>();

  step = 1;

  warehouse = new Warehouse();
  isNewWarehouse = true;

  showErrors1 = false;
  errorWarehouseName = false;

  showErrors2 = false;
  errorOwnerName = false;

  showErrors3 = false;
  errorNotSame = false;

  login = '';
  password = '';
  confirmpassword = '';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private warehouseService: CrudService<Warehouse>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.warehouseService.get('warehouse', id).then((data) => {
          this.warehouse = data;
          this.isNewWarehouse = false;

          this.dtTrigger.next('');
        });
      }
    });
  }

  previous() {
    this.step--;
  }

  suivant() {
    this.step++;
  }

  endFirstStep() {
    this.showErrors1 = true;
    if (this.warehouse.name) {
      this.endSecondStep();
    } else {
      if (!this.warehouse.name) {
        this.errorWarehouseName = true;
      }
    }
  }

  endSecondStep() {
    this.warehouse.company = this.authService.user.company;
    if (this.isNewWarehouse) {
      this.warehouseService.create('warehouse', this.warehouse).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['warehouse']);
      });
    } else {
      this.warehouseService.modify('warehouse', this.warehouse.id, this.warehouse).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['warehouse']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.warehouseService.delete('warehouse', this.warehouse.id).then(() => {
        this.router.navigate(['warehouse']);
      });
    }
  }

}
