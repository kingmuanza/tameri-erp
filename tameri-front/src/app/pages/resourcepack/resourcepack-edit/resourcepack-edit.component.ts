import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Resource } from 'src/app/_models/resource.model';
import { Resourcepack } from 'src/app/_models/resourcepack.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-resourcepack-edit',
  templateUrl: './resourcepack-edit.component.html',
  styleUrls: ['./resourcepack-edit.component.scss']
})
export class ResourcepackEditComponent implements OnInit {

  resourcepack = new Resourcepack();
  isNewResourcepack = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();
  resources = new Array<Resource>();
  suppliers = new Array<Supplier>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private supplierService: CrudService<Supplier>,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourceService: CrudService<Resource>,
    private companyService: CrudService<Company>,
    private resourcepackService: CrudService<Resourcepack>
  ) {

    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.supplierService.getAll('supplier').then((data) => {
      this.suppliers = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.resourcepackService.get('resourcepack', id).then((data) => {
          this.resourcepack = data;
          this.isNewResourcepack = false;
          
          this.suppliers.forEach((supplier) => {
            if (this.resourcepack.supplier && supplier.id === this.resourcepack.supplier.id) {
              this.resourcepack.supplier = supplier;
            }
          });

          this.resourceService.getAll('resource').then((data) => {
            console.log('resource');
            console.log(data);
            this.resources = data.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
            this.resources.forEach((p) => {
              if (p.id === this.resourcepack.resource.id) {
                this.resourcepack.resource = p;
              }
            });
          })
        });
      } else {

        this.resourceService.getAll('resource').then((data) => {
          console.log('resource');
          console.log(data);
          this.resources = data.filter((d) => {
            return d.company && d.company.id === this.company.id;
          });
        })
      }
    });
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    this.resourcepack.company = this.authService.user.company;
    if (this.isNewResourcepack) {
      this.resourcepackService.create('resourcepack', this.resourcepack).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resourcepack', 'view', this.resourcepack.id]);
      });
    } else {
      this.resourcepackService.modify('resourcepack', this.resourcepack.id, this.resourcepack).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['resourcepack', 'view', this.resourcepack.id]);
      });
    }
  }

}
