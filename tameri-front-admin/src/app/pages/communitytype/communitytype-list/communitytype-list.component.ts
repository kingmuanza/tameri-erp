import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Communitytype } from 'src/app/_models/communitytype.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-communitytype-list',
  templateUrl: './communitytype-list.component.html',
  styleUrls: ['./communitytype-list.component.scss']
})
export class CommunitytypeListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  communitytypes = new Array<any>();

  constructor(
    private router: Router,
    private communitytypeService: CrudService<Communitytype>,
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

  edit(communitytype?:Communitytype) {
    if (communitytype) {
      this.router.navigate(['parameter/communitytype', 'edit', communitytype._id]);
    } else {
      this.router.navigate(['parameter/communitytype', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.communitytypeService.getAll('communitytype').then((data) => {
      this.communitytypes = data;
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
