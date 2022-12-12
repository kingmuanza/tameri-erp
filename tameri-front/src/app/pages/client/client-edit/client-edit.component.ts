import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Client } from 'src/app/_models/client.model';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  client = new Client();
  isNewClient = true;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private clientService: CrudService<Client>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.clientService.get('client', id).then((data) => {
          this.client = data;
          this.isNewClient = false;
        }); 
      }
    });
  }

  save() {
    console.log('saving');
    if (this.isNewClient) {
      console.log('nouveau');
      console.log(this.client);
      this.clientService.create('client', this.client).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['client', 'view', _id]);
      });
    } else {
      this.clientService.modify('client', this.client._id, this.client).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['client', 'view', this.client._id]);
      });
    }
  }

  delete() {
    const oui = confirm('Are you sure to delete this item?');
    if (oui) {
      this.clientService.delete('client', this.client._id).then(() => {
        this.router.navigate(['client']);
      });
    }
  }

}
