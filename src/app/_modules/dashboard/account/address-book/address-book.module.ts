import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/_modules/material.module';

import { AddressBookRoutingModule } from './address-book-routing.module';

import { AddressBookComponent } from '@app/dashboard/account/address-book/address-book.component';

@NgModule({
  declarations: [
    AddressBookComponent
  ],
  imports: [
    CommonModule,
    AddressBookRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AddressBookModule { }
