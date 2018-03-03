import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private flashMessageService:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogoutClicked()
  {
    this.authService.logout();
    this.flashMessageService.show("Successfully logged out",{cssClass:'alert-success',timeOut:3000});
    this.router.navigate(['home']);
    return false;
  }

  isLoggedIn()
  {
    return this.authService.loggedIn();
  }
}
