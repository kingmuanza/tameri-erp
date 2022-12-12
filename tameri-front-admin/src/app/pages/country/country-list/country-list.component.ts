import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Country } from 'src/app/_models/country.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  countrys = new Array<Country>();

  constructor(
    private router: Router,
    private countryService: CrudService<Country>,
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

  edit(country?:Country) {
    if (country) {
      this.router.navigate(['parameter/country', 'edit', country._id]);
    } else {
      this.router.navigate(['parameter/country', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.countryService.getAll('country').then((data) => {
      this.countrys = data;
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
