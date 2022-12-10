import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Producttype } from 'src/app/_models/producttype.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-producttype-list',
  templateUrl: './producttype-list.component.html',
  styleUrls: ['./producttype-list.component.scss']
})
export class ProducttypeListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  producttypes = new Array<any>();
  company = new Company();

  constructor(
    private router: Router,
    private producttypeService: CrudService<Producttype>,
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

  edit(producttype?:Producttype) {
    if (producttype) {
      this.router.navigate(['parameter/producttype', 'edit', producttype._id]);
    } else {
      this.router.navigate(['parameter/producttype', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.producttypeService.getAll('producttype').then((data) => {
      this.producttypes = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
