import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  @Input() user: any;
  @Input() company: any;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.deconnexion();
    window.location.reload();
  }

}
