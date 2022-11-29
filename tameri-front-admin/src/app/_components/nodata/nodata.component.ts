import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodata',
  templateUrl: './nodata.component.html',
  styleUrls: ['./nodata.component.scss']
})
export class NodataComponent implements OnInit {

  isTime = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isTime = true;
    }, 5000);
  }

}
