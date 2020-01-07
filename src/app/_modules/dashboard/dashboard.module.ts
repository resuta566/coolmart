import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlertModule } from '../alert.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgxGalleryModule } from 'ngx-gallery';

import { DashboardComponent } from '@app/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AlertModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxGalleryModule
  ]
})
export class DashboardModule { }
