import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Contact } from 'src/app/_models/contact.model';
import { Country } from 'src/app/_models/country.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent implements OnInit, OnChanges {

  @Input() contact = new Contact();
  @Input() updradable = false;
  @Input() isTelRequired = false;
  @Input() showErrors = false;

  countries = new Array<Country>();

  constructor(
    private countryService: CrudService<Country>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.countryService.getAll('country').then((data) => {
      this.countries = data;
      data.forEach((d) => {
        if (this.contact.country && d.dial_code === this.contact.country.dial_code) {
          this.contact.country = d;
        }
      });
    });
  }

  addTel() {
    this.contact.othersTels.push('');
  }

  confirmAdd(ev: any, i: number) {
    console.log('confirmAdd');
    console.log('confirmAdd');
    if (ev.length && ev.length > 8) {
      this.contact.othersTels[i] = ev;
    }
  }

  trackByFn(index: number, item: any) {
    return index;  
  }

}
