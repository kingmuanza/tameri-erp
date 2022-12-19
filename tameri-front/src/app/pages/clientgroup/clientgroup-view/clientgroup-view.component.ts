import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Clientgroup, DiscountOnProduct } from 'src/app/_models/clientgroup.model';
import { Product } from 'src/app/_models/product.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { Unit } from 'src/app/_models/unit.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { DataService } from 'src/app/_services/data.service';
import { Client } from 'src/app/_models/client.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';

@Component({
  selector: 'app-clientgroup-view',
  templateUrl: './clientgroup-view.component.html',
  styleUrls: ['./clientgroup-view.component.scss']
})
export class ClientgroupViewComponent implements OnInit {


  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;


  step = 1;

  clientgroup = new Clientgroup();
  isNewClientgroup = true;

  salelines = new Array<Saleline>();
  products = new Array<Product>();
  product = new Product();
  quantity = 1;
  unit = '';

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;

  company = new Company();

  login = '';

  totalSales = 0;
  totalItems = 0;

  clients = new Array<Client>();
  units = DataService.units;


  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private productService: CrudService<Product>,
    private companyService: CrudService<Company>,
    private clientService: CrudService<Client>,
    private salelineService: CrudService<Saleline>,
    private clientgroupService: CrudService<Clientgroup>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.getCompany(this.company);
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.clientgroupService.get('clientgroup', id).then((data) => {
          console.log('clientgroup');
          console.log(data);
          this.clientgroup = data;
          if (!this.clientgroup.reductionsParProduit) {
            this.clientgroup.reductionsParProduit = new Array<DiscountOnProduct>();
          }
          console.log('this.clientgroup');
          console.log(this.clientgroup);
          this.isNewClientgroup = false;
          this.productService.getAll('product').then((products) => {
            this.products = products.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
          });
          this.clientService.getAll('client').then((data) => {
            this.clients = data.filter((d) => {
              return d.group && d.group.id === this.clientgroup.id;
            });
            this.dtTrigger.next('');
          });
        });
      }
    });
  }


  getCompany(company: Company) {
    this.companyService.get('company', company._id).then((data) => {
      this.company = data;
    });
  }

  voirClient(client: Client) {
    this.router.navigate(['client', 'view', client._id]);
  }
  previous() {
    this.step--;
  }

  suivant() {
    this.step++;
  }

  endFirstStep() {
    this.suivant();
  }

  save() {
    this.clientgroupService.modify('clientgroup', this.clientgroup._id, this.clientgroup).then(() => {
      this.notifierService.notify('success', "saved successfully");
      // this.router.navigate(['clientgroup', 'view', this.clientgroup.id]);
    });
  }

  saveSilent() {
    this.clientgroupService.modify('clientgroup', this.clientgroup.id, this.clientgroup).then(() => {

    });
  }

  add() {
    const newProducts = new Array<DiscountOnProduct>();
    let isClientgroupAlreadyHere = false;
    if (this.product.name && this.quantity > 0) {
      this.clientgroup.reductionsParProduit.forEach((item) => {
        if (item.product.id === this.product.id) {
          item.reduction += this.quantity;
          isClientgroupAlreadyHere = true;
        }
        newProducts.push(item);
      });
      if (!isClientgroupAlreadyHere) {
        newProducts.push({
          product: this.product,
          reduction: this.quantity,
        });
      }
      this.clientgroup.reductionsParProduit = newProducts;
      this.product = new Product();
      this.quantity = 1;
      this.showErrors = false;
      this.save();
    } else {
      this.showErrors = true;
    }
  }

  deleteProduct(r: any) {
    const oui = confirm('Are you sure to delete this item ?');
    if (oui) {
      const newProducts = new Array<any>();
      this.clientgroup.reductionsParProduit.forEach((item) => {
        if (item.product.id !== r.product.id) {
          newProducts.push(item);
        }
      });
      this.clientgroup.reductionsParProduit = newProducts;
      this.save();
    }
  }

  changeUnits(ev: any) {
    console.log('changeUnits');
    console.log(ev);
  }

  isSametype(unit: Unit, symbole: string): boolean {
    let resultat = false;
    const u = DataService.getUnit(symbole);
    if (u.type === unit.type) {
      resultat = true;
    }
    return resultat;
  }

}
