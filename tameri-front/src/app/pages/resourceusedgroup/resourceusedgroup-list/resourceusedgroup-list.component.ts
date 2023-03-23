import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Resourceusedgroup } from 'src/app/_models/resourceusedgroup.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourceusedgroup-list',
  templateUrl: './resourceusedgroup-list.component.html',
  styleUrls: ['./resourceusedgroup-list.component.scss']
})

export class ResourceusedgroupListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  resourceusedgroups = new Array<Resourceusedgroup>();
  company = new Company();

  constructor(
    private router: Router,
    private resourceusedgroupService: CrudService<Resourceusedgroup>,
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

  edit(resourceusedgroup?:Resourceusedgroup) {
    if (resourceusedgroup) {
      this.router.navigate(['resourceusedgroup', 'view', resourceusedgroup._id]);
    } else {
      this.router.navigate(['resourceusedgroup', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.resourceusedgroupService.getAll('resourceusedgroup').then((data) => {
      this.resourceusedgroups = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      console.log('this.resourceusedgroups');
      console.log(this.resourceusedgroups);
      this.dtTrigger.next('');
    }).catch((e)=> {
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
