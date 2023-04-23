import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Warehouse } from 'src/app/_models/warehouse.model';
import { Warehouseblock } from 'src/app/_models/warehouseblock.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-warehouseblock-edit',
  templateUrl: './warehouseblock-edit.component.html',
  styleUrls: ['./warehouseblock-edit.component.scss']
})
export class WarehouseblockEditComponent implements OnInit {

  step = 1;

  warehouse = new Warehouse();
  warehouseblock = new Warehouseblock();
  isNewWarehouseblock = true;

  showErrors1 = false;
  errorWarehouseblockName = false;

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
    private warehouseService: CrudService<Warehouse>,
    private warehouseblockService: CrudService<Warehouseblock>
  ) { }

  ngOnInit(): void {
    let wh_id: any;
    this.route.paramMap.subscribe((paramMap) => {
      this.route.queryParamMap.subscribe((params) => {
        wh_id = params.get('wh_id');
      });

      const id = paramMap.get('id');
 
      if (wh_id) {
        this.warehouseService.get('warehouse', wh_id).then((data) => {
          this.warehouse = data;
          this.isNewWarehouseblock = true;
        });
      }
      if (id) {
        this.warehouseblockService.get('warehouseblock', id).then((data) => {
          this.warehouseblock = data;
          this.isNewWarehouseblock = false;
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
    if (this.warehouseblock.name) {
      this.endSecondStep();
    } else {

      if (!this.warehouseblock.name) {
        this.errorWarehouseblockName = true;
      }
    }
  }

  endSecondStep() {
    this.warehouseblock.warehouse = this.warehouse;
    if (this.isNewWarehouseblock) {
      this.warehouseblockService.create('warehouseblock', this.warehouseblock).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['warehouse/view/', this.warehouse._id])
          .then(() => {
            window.location.reload();
          });
      });
    } else {
      this.warehouseblockService.modify('warehouseblock', this.warehouseblock.id, this.warehouseblock).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['warehouse/view/', this.warehouse._id])
        .then(() => {
          window.location.reload();
        });
      });
    }
  }

  delete() {
    const delete_ = confirm('Are you sure to delete this item?');
    if (delete_) {
      this.warehouseblockService.delete('warehouseblock', this.warehouseblock._id).then(() => {
        this.router.navigate(['warehouseblock']);
      });
    }
  }

}
