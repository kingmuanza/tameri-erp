import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Companytype } from 'src/app/_models/companytype.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-companytype-list',
  templateUrl: './companytype-list.component.html',
  styleUrls: ['./companytype-list.component.scss']
})
export class CompanytypeListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  companytypes = new Array<any>();

  constructor(
    private router: Router,
    private companytypeService: CrudService<Companytype>,
  ) {
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

  edit(companytype?:Companytype) {
    if (companytype) {
      this.router.navigate(['parameter/companytype', 'edit', companytype.id]);
    } else {
      this.router.navigate(['parameter/companytype', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.companytypeService.getAll('companytype').then((data) => {
      this.companytypes = data;
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
