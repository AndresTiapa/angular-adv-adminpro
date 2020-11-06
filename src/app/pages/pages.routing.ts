import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress.component';
import { Grafica1Component } from './grafica1.component';


const routes: Routes = [
  {path: 'dashboard',
  component: PagesComponent,
  children: [
    //{path: '', redirectTo: '/dashboard',  pathMatch: 'full'}
    //Rutas Hijas que aparecerán después del slash "/"
    {path: '', component: DashboardComponent},
    {path: 'progress', component: ProgressComponent},
    {path: 'grafica1', component: Grafica1Component}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
