import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/_modules/material.module';

import { AddressRoutingModule } from './address-routing.module';

import { AddressComponent } from '@app/dashboard/account/address-book/address/address.component';

@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AddressModule { }
