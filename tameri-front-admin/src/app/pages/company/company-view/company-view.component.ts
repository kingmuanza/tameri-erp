import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/_models/community.model';
import { Company } from 'src/app/_models/company.model';
import { CrudService } from 'src/app/_services/crud.service';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user.model';

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

  password = '';
  confirmpassword = '';

  showFormPassWord = false;
  showErrors = false;
  errorSame = false;
  errorSize = false;
  showFormUser = false;
  
  user: User | undefined;
  login = '';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
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

          this.authService.getUser(this.company.id).then((user) => {
            if (user) {
              this.user = user;
            }
          }); 

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

  savePassword() {
    this.showErrors = true;
    
    this.errorSame = false;
    this.errorSize = false;
    if (this.password === this.confirmpassword ) {
      this.updateUser();
    } else {
      this.errorSame = true;
    }

    if (this.password.length < 4) {
      this.errorSize = true;
    }
  }
  
  createUser() {
    const user = new User(this.company);
    user.login = this.login;
    user.password = this.password;
    user.role = 'ADMIN';

    this.authService.createUser(user).then(() => {
      this.notifierService.notify('success', "User create successfully");
      this.user = user;
    }).catch((e) => {
      this.notifierService.notify('error', "Login already use");
    });
  }

  updateUser() {
    const user = new User(this.company);
    user.login = this.user?  this.user.login: 'admin';
    user.password = this.password;
    user.role = 'ADMIN';
    user.company = this.company;

    this.authService.updateUser(user).then(() => {
      this.notifierService.notify('success', "User create successfully");
      this.user = user;
      this.showFormPassWord = false;

    }).catch((e) => {
      this.notifierService.notify('error', "Error");
    });
  }

}
