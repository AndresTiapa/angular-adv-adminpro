import { ROUTER_CONFIGURATION } from "@angular/router"

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes =
[
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent}
];

@NgModule
    (
    {
        exports: [RouterModule],
        imports: [RouterModule.forChild(routes)],
    }
    )
export class AuthRoutingModule
{

}
