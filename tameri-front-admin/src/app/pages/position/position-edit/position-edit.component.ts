import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Position } from 'src/app/_models/position.model';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.scss']
})
export class PositionEditComponent implements OnInit {

  step = 1;

  position = new Position();
  isNewPosition = true;

  showErrors1 = false;
  errorPositionName = false;

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
    private positionService: CrudService<Position>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.positionService.get('position', id).then((data) => {
          this.position = data;
          this.isNewPosition = false;
          this.authService.getUser(this.position.id).then((user) => {
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
    if (this.position.name) {
      this.endSecondStep();
    } else {
      if (!this.position.name) {
        this.errorPositionName = true;
      }
    }
  }

  endSecondStep() {
    if (this.isNewPosition) {
      this.positionService.create('position', this.position).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/position']);
      });
    } else {
      this.positionService.modify('position', this.position._id, this.position).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/position']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.positionService.delete('position', this.position._id).then(() => {
        this.router.navigate(['parameter/position']);
      });
    }
  }

}
