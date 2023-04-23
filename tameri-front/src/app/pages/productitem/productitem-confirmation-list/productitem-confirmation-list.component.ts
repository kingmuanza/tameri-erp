import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productitem-confirmation-list',
  templateUrl: './productitem-confirmation-list.component.html',
  styleUrls: ['./productitem-confirmation-list.component.scss']
})
export class ProductitemConfirmationListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  productitems = new Array<Productitem>();
  company = new Company();

  CONFIRMED = Productitem.CONFIRMED;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private productitemService: CrudService<Productitem>,
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

  edit(productitem?:Productitem) {
    if (productitem) {
      this.router.navigate(['productitem', 'view', productitem._id]);
    } else {
      this.router.navigate(['productitem', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.productitemService.getAll('productitem').then((data) => {
      this.productitems = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    }).catch((e)=> {
      this.dtTrigger.next('');
    });
  }

  confirmProductItem(productitem: Productitem) {
    const yes = confirm('Are you sure to confirm this product item ?');
    if (yes) {
      productitem.quantityNotValidated = productitem.quantity;
      productitem.quantity = productitem.quantityValidated;
      productitem.status = Productitem.CONFIRMED;
      this.save(productitem);
    }
  }

  isNotEqual(productitem: Productitem) {
    return productitem.quantityNotValidated && productitem.quantityNotValidated !== productitem.quantity
  }

  save(productitem: Productitem) {
    this.productitemService.modify('productitem', productitem._id, productitem).then(() => {
      this.notifierService.notify('success', "saved successfully");      
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addLocation(productitem: Productitem) {
    this.router.navigate(['productitem-location', 'edit', productitem._id]);
  }
  
}
