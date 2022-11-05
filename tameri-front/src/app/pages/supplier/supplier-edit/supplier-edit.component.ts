import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {

  supplier = new Supplier();
  isNewSupplier = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();
  
  step = 1;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private supplierService: CrudService<Supplier>
  ) { }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.supplierService.get('supplier', id).then((data) => {
          this.supplier = data;
          this.isNewSupplier = false;
        }); 
      }
    });
  }

  save() {
    this.supplier.company = this.authService.user.company;
    if (this.isNewSupplier) {
      this.supplierService.create('supplier', this.supplier).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['supplier', 'view', this.supplier.id]);
      });
    } else {
      this.supplierService.modify('supplier', this.supplier.id, this.supplier).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['supplier', 'view', this.supplier.id]);
      });
    }
  }

}
