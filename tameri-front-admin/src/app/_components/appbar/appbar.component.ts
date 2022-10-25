import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  @Input() user: any;
  @Input() company: any;

  constructor() { }

  ngOnInit(): void {
  }

}
