import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcepack } from 'src/app/_models/resourcepack.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.scss']
})
export class SupplierViewComponent implements OnInit {

  step = 1;

  supplier = new Supplier();
  isNewSupplier = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  password = '';
  confirmpassword = '';

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;
  
  login = '';
  resources = new Array<Resource>();
  resourcepacks = new Array<Resourcepack>();
  company = new Company();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourcepackService: CrudService<Resourcepack>,
    private resourceService: CrudService<Resource>,
    private supplierService: CrudService<Supplier>
  ) {
    this.company = this.authService.user.company;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.supplierService.get('supplier', id).then((data) => {
          this.supplier = data;
          this.isNewSupplier = false;

          this.resourceService.getAll('resource').then((data) => {
            this.resources = data.filter((d) => {
              return d.company && d.company.id === this.company.id && d.supplier && d.supplier.id === this.supplier.id;
            });
          });

          this.resourcepackService.getAll('resourcepack').then((data) => {
            this.resourcepacks = data.filter((d) => {
              return d.company && d.company.id === this.company.id && d.supplier && d.supplier.id === this.supplier.id;
            });
          });
          
        });
      }
    });
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
    this.supplierService.modify('supplier', this.supplier.id, this.supplier).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['supplier', 'view', this.supplier.id]);
    });
  }

  viewResource(resource: Resource) {
    this.router.navigate(['resource', 'view', resource.id]);
  }

  viewResourcePack(resourcepack: Resourcepack) {
    this.router.navigate(['resourcepack', 'view', resourcepack.id]);
  }
}
