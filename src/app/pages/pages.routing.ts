import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress.component';
import { Grafica1Component } from './grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {
    path: 'dashboard',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {path: '', component: DashboardComponent, data: {titulo: 'DashBoard'} },
    {path: 'progress', component: ProgressComponent, data: {titulo: 'Estadisticas'}},
    {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Graficos y datos'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Reactive X'}},
    {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
    {path: 'AccSet', component: AccountSettingsComponent, data: {titulo: 'Personalizar cuenta'}}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
