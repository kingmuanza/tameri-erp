import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/_models/community.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';
import { Communitytype } from 'src/app/_models/communitytype.model';

@Component({
  selector: 'app-community-edit',
  templateUrl: './community-edit.component.html',
  styleUrls: ['./community-edit.component.scss']
})
export class CommunityEditComponent implements OnInit {

  community = new Community();
  isNewCommunity = true;
  communitytypes = new Array<Communitytype>();

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private communitytypeService: CrudService<Communitytype>,
    private communityService: CrudService<Community>
  ) { }

  ngOnInit(): void {
    this.communitytypeService.getAll('communitytype').then((data) => {
      this.communitytypes = data;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.communityService.get('community', id).then((data) => {
          this.community = data;
          this.isNewCommunity = false;
        }); 
      }
    });
  }

  save() {
    if (this.isNewCommunity) {
      this.communityService.create('community', this.community).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['community', 'view', _id]);
      });
    } else {
      this.communityService.modify('community', this.community._id, this.community).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['community', 'view', this.community._id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.communityService.delete('community', this.community._id).then(() => {
        this.router.navigate(['community']);
      });
    }
  }

}
