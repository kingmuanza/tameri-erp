import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  step = 1;

  company = new Company();
  isNewCompany = true;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.companyService.get('company', id).then((data) => {
          this.company = data;
          this.isNewCompany = false;
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

  endSecondStep() {
    if (this.isNewCompany) {
      this.companyService.create('company', this.company).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['company', 'view', this.company.id]);
      });
    } else {
      this.companyService.modify('company', this.company.id, this.company).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['company', 'view', this.company.id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.companyService.delete('company', this.company.id).then(() => {
        this.router.navigate(['company']);
      });
    }
  }

}
