import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/_data/datatable.option';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-community-view',
  templateUrl: './community-view.component.html',
  styleUrls: ['./community-view.component.scss']
})
export class CommunityViewComponent implements OnInit {

  community = new Community();
  isNewCommunity = true;

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  companies = new Array<any>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private companyService: CrudService<Company>,
    private communityService: CrudService<Community>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.communityService.get('community', id).then((data) => {
          this.community = data;
          this.isNewCommunity = false;
          this.companyService.getAll('company').then((data) => {
            this.companies = data.filter((company) => {
              return company.community && company.community.id === this.community.id;
            });
            this.dtTrigger.next('');
          });
        });
      }
    });
  }

  save() {
    if (this.isNewCommunity) {
      this.communityService.create('community', this.community).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['community', 'view', this.community.id]);
      });
    } else {
      this.communityService.modify('community', this.community.id, this.community).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['community', 'view', this.community.id]);
      });
    }
  }

  viewCompany(company: Company) {

  }
}
