import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Inventorygroup } from 'src/app/_models/inventorygroup.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-inventorygroup-list',
  templateUrl: './inventorygroup-list.component.html',
  styleUrls: ['./inventorygroup-list.component.scss']
})
export class InventorygroupListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  inventorygroups = new Array<Inventorygroup>();
  company = new Company();

  constructor(
    private router: Router,
    private inventorygroupService: CrudService<Inventorygroup>,
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

  edit(inventorygroup?:Inventorygroup) {
    if (inventorygroup) {
      this.router.navigate(['inventorygroup', 'view', inventorygroup._id]);
    } else {
      this.router.navigate(['inventorygroup', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.inventorygroupService.getAll('inventorygroup').then((data) => {
      this.inventorygroups = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      console.log('this.inventorygroups');
      console.log(this.inventorygroups);
      this.dtTrigger.next('');
    }).catch((e)=> {
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
