import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Company } from 'src/app/_models/company.model';
import { Sale } from 'src/app/_models/sale.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  sales = new Array<Sale>();
  company = new Company();

  constructor(
    private router: Router,
    private saleService: CrudService<Sale>,
    private authService: AuthenticationService,
  ) {
    this.company = this.authService.user.company;
  }

  private initNouveau() {
    let dtOptions: any
    dtOptions = JSON.parse(JSON.stringify(DatatablesOptions));
    let that = this;
    return dtOptions;
  }

  edit(sale: Sale) {
    console.log('nnsqbkj');
    if (sale._id) {
      this.router.navigate(['bill', 'edit', sale._id]);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.initNouveau();
    this.saleService.getAll('bill').then((data) => {
      this.sales = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.dtTrigger.next('');
    });
  }

  getTotal(sale: Sale): number {
    let total = 0;
    sale.salelines.forEach((d) => {
      total += d.quantity * d.productpack.price;
    });
    return total;
  }

  setDelivered(sale: Sale) {
    sale.delivery = true;
    this.saleService.modify('bill', sale._id, sale).then((data) => {
      
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
