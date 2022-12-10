import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcetype } from 'src/app/_models/resourcetype.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss']
})
export class ResourceEditComponent implements OnInit {

  resource = new Resource();
  isNewResource = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();

  suppliers = new Array<Supplier>();
  resourcetypes = new Array<any>();

  showErrors = false;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>,
    private supplierService: CrudService<Supplier>,
    private resourcetypeService: CrudService<Resourcetype>,
    private resourceService: CrudService<Resource>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.supplierService.getAll('supplier').then((data) => {
      this.suppliers = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.resourcetypeService.getAll('resourcetype').then((data) => {
        this.resourcetypes = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.resourceService.get('resource', id).then((data) => {
              this.resource = data;
              this.isNewResource = false;
              this.suppliers.forEach((supplier) => {
                if (this.resource.supplier && supplier.id === this.resource.supplier.id) {
                  this.resource.supplier = supplier;
                }
              });
              this.resourcetypes.forEach((resourcetype) => {
                if (this.resource.category && resourcetype.id === this.resource.category.id) {
                  this.resource.category = resourcetype;
                  this.resource.unit = resourcetype.unit;
                }
              });
            }); 
          }
        });
      });
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    if (!this.resource.name || !this.resource.content || !this.resource.category.name) {
      this.showErrors = true;
      return ;
    }
    this.resource.company = this.authService.user.company;
    this.resource.unit = this.resource.category.unit;
    if (this.isNewResource) {
      this.resourceService.create('resource', this.resource).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resource', 'view', _id]);
      });
    } else {
      this.resourceService.modify('resource', this.resource._id, this.resource).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resource', 'view', this.resource._id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.resourceService.delete('resource', this.resource._id).then(() => {
        this.router.navigate(['resource']);
      });
    }
  }

}
