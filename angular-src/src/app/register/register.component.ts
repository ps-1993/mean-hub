import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private validateService:ValidateService,
    private flashMessageService:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  onRegister(ngForm:NgForm)
  {
    const user = {
      name:ngForm.value.name,
      username:ngForm.value.username,
      email:ngForm.value.email,
      password:ngForm.value.password,
    };
    if(ngForm.invalid)
    {
      this.flashMessageService.show("Please fill out all the fields!!!!",
      {cssClass:'alert-danger',timeOut:3000});
      this.router.navigate(['/home']);
    }
    
    //register user if form is valid
    if(ngForm.valid)
    {
      this.authService.registerUser(user).subscribe((data)=>
      {
        console.log(data);
        console.log(data.success);
        if(data.success)
        {         
          console.log("success");
          this.flashMessageService.show("Successfully registered!!!! Login to continue",
          {cssClass:'alert-success',timeOut:3000});
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessageService.show("Something went wrong!!!!",
          {cssClass:'alert-danger',timeOut:3000});
          this.router.navigate(['/register']);
        }
      }
      );
    }

  }
}
