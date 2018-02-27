import { NgModule } from "@angular/core";
import { RouterModule ,Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth.guard";

const appRoutes : Routes=[
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    {path:'**', redirectTo: ''}

];

@NgModule({
    providers:[AuthGuard],
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRouterModule{

}