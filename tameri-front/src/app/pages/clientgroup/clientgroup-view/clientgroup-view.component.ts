import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Clientgroup } from 'src/app/_models/clientgroup.model';
import { Resource } from 'src/app/_models/resource.model';
import { Saleline } from 'src/app/_models/saleline.model';
import { Unit } from 'src/app/_models/unit.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-clientgroup-view',
  templateUrl: './clientgroup-view.component.html',
  styleUrls: ['./clientgroup-view.component.scss']
})
export class ClientgroupViewComponent implements OnInit {

  step = 1;

  clientgroup = new Clientgroup();
  isNewClientgroup = true;

  salelines = new Array<Saleline>();
  resources = new Array<Resource>();
  resource = new Resource();
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

  units = DataService.units;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private resourceService: CrudService<Resource>,
    private companyService: CrudService<Company>,
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
          console.log('this.clientgroup');
          console.log(this.clientgroup);
          this.isNewClientgroup = false;
          this.resourceService.getAll('resource').then((resources) => {
            this.resources = resources.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
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
    /* const newResources = new Array<any>();
    let isClientgroupAlreadyHere = false;
    if (this.resource.name && this.quantity > 0) {
      this.clientgroup.resources.forEach((item) => {
        if (item.resource.id === this.resource.id) {
          item.quantity += this.convert(this.quantity, this.unit, this.resource.unit);
          isClientgroupAlreadyHere = true;
        }
        newResources.push(item);
      });
      if (!isClientgroupAlreadyHere) {
        newResources.push({
          resource: this.resource,
          quantity: this.convert(this.quantity, this.unit, this.resource.unit),
          unit: this.unit,
        });
      }
      this.clientgroup.resources = newResources;
      this.resource = new Resource();
      this.quantity = 1;
      this.showErrors = false;
      this.save();
    } else {
      this.showErrors = true;
    }*/
  } 

  deleteResource(r: any) {
    /* const oui = confirm('Are you sure to delete this item ?');
    if (oui) {
      const newResources = new Array<any>();
      this.clientgroup.resources.forEach((item) => {
        if (item.resource.id !== r.resource.id) {
          newResources.push(item);
        }
      });
      this.clientgroup.resources = newResources;
      this.save();
    } */
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
