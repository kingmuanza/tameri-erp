import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Communitytype } from 'src/app/_models/communitytype.model';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-communitytype-edit',
  templateUrl: './communitytype-edit.component.html',
  styleUrls: ['./communitytype-edit.component.scss']
})
export class CommunitytypeEditComponent implements OnInit {

  step = 1;

  communitytype = new Communitytype();
  isNewCommunitytype = true;

  showErrors1 = false;
  errorCommunitytypeName = false;

  showErrors2 = false;
  errorOwnerName = false;

  showErrors3 = false;
  errorNotSame = false;

  login = '';
  password = '';
  confirmpassword = '';

  user: User | undefined;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private communitytypeService: CrudService<Communitytype>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.communitytypeService.get('communitytype', id).then((data) => {
          this.communitytype = data;
          this.isNewCommunitytype = false;
          this.authService.getUser(this.communitytype.id).then((user) => {
            if (user) {
              this.user = user;
              this.login = user.login;
              this.password = user.password;
            }
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
    this.showErrors1 = true;
    if (this.communitytype.name) {
      this.endSecondStep();
    } else {
      if (!this.communitytype.name) {
        this.errorCommunitytypeName = true;
      }
    }
  }

  endSecondStep() {
    if (this.isNewCommunitytype) {
      this.communitytypeService.create('communitytype', this.communitytype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/communitytype']);
      });
    } else {
      this.communitytypeService.modify('communitytype', this.communitytype._id, this.communitytype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/communitytype']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.communitytypeService.delete('communitytype', this.communitytype._id).then(() => {
        this.router.navigate(['parameter/communitytype']);
      });
    }
  }

}
