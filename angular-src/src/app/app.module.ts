import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRouterModule } from './app-router.module';
import { LoginComponent } from './login/login.component';
import { ValidateService } from './services/validate.service';

import {FlashMessagesModule} from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
    AppRouterModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
