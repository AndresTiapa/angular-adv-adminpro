import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule, Routes} from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/Auth' AuthRouting
  // path: '/dashboard' PagesRouting
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
