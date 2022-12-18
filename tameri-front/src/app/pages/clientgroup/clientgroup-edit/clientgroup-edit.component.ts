import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Clientgroup } from 'src/app/_models/clientgroup.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-clientgroup-edit',
  templateUrl: './clientgroup-edit.component.html',
  styleUrls: ['./clientgroup-edit.component.scss']
})
export class ClientgroupEditComponent implements OnInit {

  clientgroup = new Clientgroup();
  isNewClientgroup = true;
  company = new Company();

  suppliers = new Array<Supplier>();
  clientgrouptypes = new Array<any>();

  showErrors = false;

  units = DataService.units;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>,
    private supplierService: CrudService<Supplier>,
    private clientgroupService: CrudService<Clientgroup>
  ) {
    this.company = this.authService.user.company;
    this.getCompany(this.company);
  }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.clientgroupService.get('clientgroup', id).then((data) => {
          this.clientgroup = data;
          this.isNewClientgroup = false;          
        }); 
      }
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    if (!this.clientgroup.name || this.clientgroup.reductionglobale > 100) {
      this.showErrors = true;
      return ;
    }
    this.clientgroup.company = this.authService.user.company;
    if (this.isNewClientgroup) {
      this.clientgroupService.create('clientgroup', this.clientgroup).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['clientgroup', 'view', _id]);
      });
    } else {
      this.clientgroupService.modify('clientgroup', this.clientgroup._id, this.clientgroup).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['clientgroup', 'view', this.clientgroup._id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.clientgroupService.delete('clientgroup', this.clientgroup._id).then(() => {
        this.router.navigate(['clientgroup']);
      });
    }
  }

}
