import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Productcategory } from 'src/app/_models/productcategory.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-productcategory-edit',
  templateUrl: './productcategory-edit.component.html',
  styleUrls: ['./productcategory-edit.component.scss']
})
export class ProductcategoryEditComponent implements OnInit {

  step = 1;

  productcategory = new Productcategory();
  isNewProductcategory = true;

  showErrors1 = false;
  errorProductcategoryName = false;

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
    private productcategoryService: CrudService<Productcategory>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {

        this.productcategoryService.get('productcategory', id).then((data) => {
          this.productcategory = data;
          this.isNewProductcategory = false;
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
    if (this.productcategory.name) {
      this.endSecondStep();
    } else {
      if (!this.productcategory.name) {
        this.errorProductcategoryName = true;
      }
    }
  }

  endSecondStep() {
    this.productcategory.company = this.authService.user.company;
    if (this.isNewProductcategory) {
      this.productcategoryService.create('productcategory', this.productcategory).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/productcategory']);
      });
    } else {
      this.productcategoryService.modify('productcategory', this.productcategory.id, this.productcategory).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.step++;
        this.router.navigate(['parameter/productcategory']);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.productcategoryService.delete('productcategory', this.productcategory.id).then(() => {
        this.router.navigate(['parameter/productcategory']);
      });
    }
  }

}
