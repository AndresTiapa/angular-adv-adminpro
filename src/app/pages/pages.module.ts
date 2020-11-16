import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress.component';
import { Grafica1Component } from './grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../component/component.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    ComponentModule
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    //IncrementComponent
    ComponentModule

  ]
})
export class PagesModule { }
