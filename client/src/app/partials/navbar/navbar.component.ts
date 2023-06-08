import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public identity : any;

  constructor(
    public _authService : AuthService
  ) {
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
  }

}
