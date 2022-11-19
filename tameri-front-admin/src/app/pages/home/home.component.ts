import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  companies = new Array<any>();
  pricings = new Array<any>();
  communities = new Array<Community>();

  optionPrices: any = {

    productResource: 0,
    productPack: 0,

    restau: 0,
    bar: 0,
    shop: 0,
    prestationservice: 0,
    personnalized: 0,

    service: 0,
    client: 0,
    pack: 0,
    printing: 0,
    scm: 0,
    crm: 0,

  };

  listElement = new Array<string>();

  price = 0;

  constructor(
    private router: Router,
    private companyService: CrudService<Company>,
    private pricingService: CrudService<any>,
    private communityService: CrudService<Community>,
  ) {
  }

  private initNouveau() {
    let dtOptions: any
    dtOptions = JSON.parse(JSON.stringify(DatatablesOptions));

    return dtOptions;
  }

  edit(company?: Company) {
    if (company) {
      this.router.navigate(['company', 'view', company.id]);
    } else {
      this.router.navigate(['company', 'edit']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.companyService.getAll('company').then((data) => {
      this.companies = data;
      this.price = 0;

      this.optionPrices = {

        productResource: 0,
        productPack: 0,

        restau: 0,
        bar: 0,
        shop: 0,
        prestationservice: 0,
        personnalized: 0,

        service: 0,
        client: 0,
        pack: 0,
        printing: 0,
        scm: 0,
        crm: 0,

      };
      this.companies.forEach((company) => {
        this.price += this.getPrice(company);
        this.getOptionsOfCompany(company);
      });
      this.dtTrigger.next('');
    });
    this.pricingService.getAll('pricing').then((data) => {
      this.pricings = data;
    });
    this.communityService.getAll('community').then((data) => {
      this.communities = data;
    });

    this.listElement = Object.keys(this.optionPrices);
  }

  getLibelleOption(key: string) {
    switch (key) {
      case 'productResource':
        return 'Product with resource';

      case 'productPack':
        return 'Product with pack';

      case 'prestationservice':
        return 'Service';

      case 'service':
        return 'POS with service';

      case 'client':
        return 'POS with client';

      case 'pack':
        return 'POS with pack';

      case 'scm':
        return 'SCM';

      case 'crm':
        return 'CRM';

      default:
        return key;
    }

  }

  getPrice(company: Company): number {
    // console.log('Calcul');
    let amount = 0;
    if (company.option && company.pricing) {
      const object = JSON.parse(JSON.stringify(company.option));
      const objectPrix = JSON.parse(JSON.stringify(company.pricing));
      const keys = Object.keys(object);
      keys.forEach((key: string) => {
        amount += object[key] ? objectPrix[key] : 0;
      });
    }
    return amount;
  }

  getOptionsOfCompany(company: Company) {
    let companyoption: any;
    companyoption = company.option;
    let optionPrices: any;
    optionPrices = this.optionPrices;
    console.log('companyoption');
    console.log(companyoption);
    console.log('optionPrices');
    console.log(optionPrices);
    Object.keys(companyoption).forEach((key: string) => {
      if (companyoption[key]) {
        optionPrices[key] += 1;
      }
    });
    this.optionPrices = optionPrices;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
