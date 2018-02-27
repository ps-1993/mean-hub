import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((profile)=>
      {
        this.user=profile.user;
      },
    (error)=>
      {
        console.log("error :"+error);
        this.router.navigate(['login']);
      });
  }

  
}