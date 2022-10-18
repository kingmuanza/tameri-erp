import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  step = 1;

  company = new Company();
  isNewCompany = true;

  communities = new Array<Community>();

  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private communityService: CrudService<Community>,
    private companyService: CrudService<Company>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.companyService.get('company', id).then((data) => {
          this.company = data;
          this.isNewCompany = false;

          this.communityService.getAll('community').then((data) => {
            this.communities = data;
            this.communities.forEach((community) => {
              if (this.company.community) {
                if (community.id === this.company.community.id) {
                  this.company.community = community;
                }
              }
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
    this.companyService.modify('company', this.company.id, this.company).then(() => {
      this.notifierService.notify('success', "saved successfully");
      this.router.navigate(['company', 'view', this.company.id]);
    });
  }

}
