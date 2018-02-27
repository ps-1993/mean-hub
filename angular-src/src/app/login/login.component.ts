import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private flashMessageService: FlashMessagesService,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin(ngForm:NgForm){
    if(ngForm.invalid)
    {
      this.flashMessageService.show("Please provide credentials to login!!!!",{cssClass:'alert-danger',timeOut:3000});
    }
    else{
      const user = {
        username :ngForm.value.username,
        password :ngForm.value.password
      }
      this.authService.authenticateUser(user).subscribe((data)=>{
        if(data.status)
        {
          this.authService.storeUserData(data.token,data.user);
          this.flashMessageService.show("Successfully Logged in!!!!",{cssClass:'alert-success',timeOut:5000});
          this.router.navigate(['profile']);
        }
        else{
          this.flashMessageService.show(data.msg,{cssClass:'alert-danger',timeOut:5000});
          this.router.navigate(['login']);
        }
      });
    }
  }

}
