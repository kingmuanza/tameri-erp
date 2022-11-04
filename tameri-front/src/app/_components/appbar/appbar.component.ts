import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit, OnChanges {

  @Input() user: any;
  @Input() company: any;

  constructor(
    private authService: AuthenticationService,
  ) {
    this.company = this.user?.company;
    console.log('this.company AppbarComponent');
    console.log(this.company);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.company = this.user?.company;
    console.log('this.company AppbarComponent SimpleChanges');
    console.log(this.company);
  }

  ngOnInit(): void {

  }

  signOut() {
    this.authService.deconnexion();
    window.location.reload();
  }

}
