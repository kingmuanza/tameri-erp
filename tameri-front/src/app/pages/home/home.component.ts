import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Resourceitem } from 'src/app/_models/resourceitem.model';
import { Sale } from 'src/app/_models/sale.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Datatables
  dtOptionsOrders: any = DatatablesOptions;
  dtTriggerOrders = new Subject<any>();
  dtOptionsResources: any = DatatablesOptions;
  dtTriggerResources = new Subject<any>();

  CONFIRMED = Resourceitem.CONFIRMED;

  company = new Company();
  sales = new Array<Sale>();
  salesPaid = new Array<Sale>();
  resourceitems = new Array<Resourceitem>();

  constructor(
    private router: Router,
    private companyService: CrudService<Company>,
    private saleService: CrudService<Sale>,
    private authService: AuthenticationService,
    private resourceitemService: CrudService<Resourceitem>,
  ) {

    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.saleService.getAll('bill').then((data) => {
      this.sales = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.salesPaid = data.filter((d) => {
        return d.company && d.company.id === this.company.id && d.good;
      });
      this.dtTriggerOrders.next('');
    });
    this.resourceitemService.getAll('resourceitem').then((data) => {
      this.resourceitems = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTriggerResources.next('');
    }).catch((e) => {
      this.dtTriggerResources.next('');
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
    });
  }

  getTotal(sale: Sale): number {
    let total = 0;
    sale.salelines.forEach((d) => {
      total += d.quantity * d.productpack.price;
    });
    if (sale.reduction) {
      total -= sale.reduction;
    }
    return total;
  }

  getGreatTotal(sales: Sale[]) {
    let total = 0;
    sales.forEach((sale) => {
      total += this.getTotal(sale);
    });
    return total
  }

  goToOrders() {
    this.router.navigate(['bill']);
  }

}
