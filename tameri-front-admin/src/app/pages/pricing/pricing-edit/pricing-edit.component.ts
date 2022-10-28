import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OptionPriceData } from 'src/app/_models/option.price.data.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-pricing-edit',
  templateUrl: './pricing-edit.component.html',
  styleUrls: ['./pricing-edit.component.scss']
})
export class PricingEditComponent implements OnInit {

  pricing = OptionPriceData;
  isNewPricing = true;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private pricingService: CrudService<any>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.pricingService.get('pricing', id).then((data) => {
          this.pricing = data;
          this.isNewPricing = false;
        }); 
      }
    });
  }

  save() {
    if (this.isNewPricing) {
      this.pricingService.create('pricing', this.pricing).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['pricing']);
      });
    } else {
      this.pricingService.modify('pricing', this.pricing.id, this.pricing).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['pricing']);
      });
    }
  }

}
