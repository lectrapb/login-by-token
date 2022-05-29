import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
      HomeComponent,
      PagesComponent
  ],
  exports:[
      HomeComponent,
      PagesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    RouterModule,
  ]
})
export class PagesModule { }
