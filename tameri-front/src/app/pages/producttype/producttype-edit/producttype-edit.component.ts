import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Producttype } from 'src/app/_models/producttype.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-producttype-edit',
  templateUrl: './producttype-edit.component.html',
  styleUrls: ['./producttype-edit.component.scss']
})
export class ProducttypeEditComponent implements OnInit {

  step = 1;

  producttype = new Producttype();
  isNewProducttype = true;

  showErrors1 = false;
  errorProducttypeName = false;

  showErrors2 = false;
  errorOwnerName = false;

  showErrors3 = false;
  errorNotSame = false;

  login = '';
  password = '';
  confirmpassword = '';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private producttypeService: CrudService<Producttype>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.producttypeService.get('producttype', id).then((data) => {
          this.producttype = data;
          this.isNewProducttype = false;
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
    if (this.producttype.name) {
      this.endSecondStep();
    } else {
      if (!this.producttype.name) {
        this.errorProducttypeName = true;
      }
    }
  }

  endSecondStep() {
    this.producttype.company = this.authService.user.company;
    if (this.isNewProducttype) {
      this.producttypeService.create('producttype', this.producttype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/producttype']);
      });
    } else {
      this.producttypeService.modify('producttype', this.producttype.id, this.producttype).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/producttype']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.producttypeService.delete('producttype', this.producttype.id).then(() => {
        this.router.navigate(['parameter/producttype']);
      });
    }
  }

}
