import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourceitem-confirmation-list',
  templateUrl: './resourceitem-confirmation-list.component.html',
  styleUrls: ['./resourceitem-confirmation-list.component.scss']
})
export class ResourceitemConfirmationListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resourceitems = new Array<Resourceitem>();
  company = new Company();

  CONFIRMED = Resourceitem.CONFIRMED;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private resourceitemService: CrudService<Resourceitem>,
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

  edit(resourceitem?:Resourceitem) {
    if (resourceitem) {
      this.router.navigate(['resourceitem', 'view', resourceitem._id]);
    } else {
      this.router.navigate(['resourceitem', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.resourceitemService.getAll('resourceitem').then((data) => {
      this.resourceitems = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.resourceitems.forEach((d) => {
        if (d.status != Resourceitem.CONFIRMED) {
          d.quantityValidated = d.quantity;
          d.quantityNotValidated = d.quantity;
        }
      });
      this.dtTrigger.next('');
    }).catch((e)=> {
      this.dtTrigger.next('');
    });
  }

  confirmResourceItem(resourceitem: Resourceitem) {
    const yes = confirm('Are you sure to confirm this resource item ?');
    if (yes) {
      resourceitem.status = Resourceitem.CONFIRMED;
      resourceitem.quantityNotValidated = resourceitem.quantity;
      resourceitem.quantity = resourceitem.quantityValidated;
      this.save(resourceitem);
    }
  }

  save(resourceitem: Resourceitem) {
    this.resourceitemService.modify('resourceitem', resourceitem._id, resourceitem).then(() => {
      this.notifierService.notify('success', "saved successfully");      
    });
  }

  isNotEqual(resourceitem: Resourceitem) {
    return resourceitem.quantityNotValidated && resourceitem.quantityNotValidated !== resourceitem.quantity
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
