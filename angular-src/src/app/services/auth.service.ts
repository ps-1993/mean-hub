
import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken :string;
  user:any;

  constructor(private http:Http) { }

 registerUser(user)
  {
      let headers:Headers = new Headers();
      headers.append('Content-Type','application/json');

     return this.http.post("http://localhost:3000/user/register",user,{headers:headers})
            .map(function(res){
                return res.json();
            });
  }

    authenticateUser(user)
  {
    let headers:Headers = new Headers();
    headers.append('Content-Type','application/json');

   return this.http.post("http://localhost:3000/user/authenticate",user,{headers:headers})
          .map(function(res){
              return res.json();
          });
  }

  getUserProfile()
  {
    let headers:Headers = new Headers();
    headers.append('Content-Type','application/json');
    this.loadToken();
    headers.append('Authorization',this.authToken);
   return this.http.get("http://localhost:3000/user/profile",{headers:headers})
          .map(function(res){
              return res.json();
          });
  }

  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken=token;
  }
  storeUserData(token,user)
  {
    localStorage.setItem('id_token',token);
    //localstorage can only store string value...need to parse it back to json while retrieving from localstorage
    localStorage.setItem('user',JSON.stringify(user));

    this.authToken=token;
    this.user=user;
  }
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }

  loggedIn()
  {
    let isExpired =tokenNotExpired('id_token');
    return isExpired;
  }
}
