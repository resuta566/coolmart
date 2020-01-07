import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/_modules/material.module';

import { AccountRoutingModule } from './account-routing.module';

import { SummaryComponent } from '@app/dashboard/account/summary/summary.component';
import { AccountComponent } from '@app/dashboard/account/account.component';
import { ProfileComponent } from '@app/dashboard/account/profile/profile.component';
import { PaymentOptionsComponent } from '@app/dashboard/account/payment-options/payment-options.component';


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    PaymentOptionsComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AccountModule { }
