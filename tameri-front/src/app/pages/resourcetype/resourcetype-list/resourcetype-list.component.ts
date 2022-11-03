import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Resourcetype } from 'src/app/_models/resourcetype.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourcetype-list',
  templateUrl: './resourcetype-list.component.html',
  styleUrls: ['./resourcetype-list.component.scss']
})
export class ResourcetypeListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resourcetypes = new Array<any>();

  constructor(
    private router: Router,
    private resourcetypeService: CrudService<Resourcetype>,
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

  edit(resourcetype?:Resourcetype) {
    if (resourcetype) {
      this.router.navigate(['parameter/resourcetype', 'edit', resourcetype.id]);
    } else {
      this.router.navigate(['parameter/resourcetype', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.resourcetypeService.getAll('resourcetype').then((data) => {
      this.resourcetypes = data;
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
