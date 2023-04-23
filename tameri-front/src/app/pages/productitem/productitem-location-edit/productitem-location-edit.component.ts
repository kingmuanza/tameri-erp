import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Warehouse } from 'src/app/_models/warehouse.model';
import { Warehouseblock } from 'src/app/_models/warehouseblock.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productitem-location-edit',
  templateUrl: './productitem-location-edit.component.html',
  styleUrls: ['./productitem-location-edit.component.scss']
})
export class ProductitemLocationEditComponent implements OnInit {

  step = 1;

  productitem = new Productitem;
  warehouses = new Array<Warehouse>();
  warehouseblocks  = new Array<Warehouseblock>();

  isItemlocated = true;

  showErrors1 = false;
  errorWarehouseName = false;

  showErrors2 = false;
  errorOwnerName = false;

  showErrors3 = false;
  errorNotSame = false;

  login = '';
  password = '';
  confirmpassword = '';
  company = new Company();
  CONFIRMED = Productitem.CONFIRMED;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private warehouseService: CrudService<Warehouse>,
    private warehouseblockService: CrudService<Warehouseblock>,
    private productitemService:CrudService<Productitem>
  ) { }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      this.warehouseService.getAll('warehouse').then((whs) => {
        // filter company is missing
        //return d.company && d.company.id === this.company.id;
        this.warehouses = whs;
      });

      const id = paramMap.get('id');
      if (id) {
        this.productitemService.get('productitem', id).then((data) => {
          this.productitem = data;
          this.isItemlocated = false;
        });
      }

      console.log("++++++++++++++++++++++++++++++++" + this.productitem.productpack?.name);
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
    if (this.productitem) {
      this.endSecondStep();
    } else {
      if (!this.productitem) {
        this.errorWarehouseName = true;
      }
    }
  }

  endSecondStep() {
    this.confirmProductItem(this.productitem);
    this.productitemService.modify('productitem', this.productitem.id, this.productitem).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.step++;
      this.router.navigate(['productitem-confirmation']);
    });
  }

  confirmProductItem(productitem: Productitem) {
    const yes = confirm('Are you sure to confirm this product item ?');
    if (yes) {
      productitem.quantityNotValidated = productitem.quantity;
      productitem.quantity = productitem.quantityValidated;
      productitem.status = Productitem.CONFIRMED;
      //this.save(productitem);
    }
  }

  delete() {
    const delete_ = confirm('Are you sure to delete this item?');
    if (delete_) {
      this.productitemService.delete('productitem', this.productitem._id).then(() => {
        this.router.navigate(['productitem']);
      });
    }
  }

  getWarehouseblocks(warehouse: Warehouse) {
    this.warehouseblockService.getAll('warehouseblock').then((data) => {
      this.warehouseblocks = data.filter((d) => {
        return d.warehouse._id === warehouse._id && d.warehouse.company && d.warehouse.company.id === this.company.id;
      });
    });
  }

}
