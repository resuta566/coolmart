import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  FaqComponent,
  AboutUsComponent,
  ContactUsComponent,
  ErrorpagesComponent,
  SignComponent,
  InComponent,
  UpComponent,
  TermsConditionsComponent
  } from '../pages';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

  const Pages = [
    FaqComponent,
    AboutUsComponent,
    ContactUsComponent,
    ErrorpagesComponent,
    SignComponent,
    InComponent,
    UpComponent,
    TermsConditionsComponent
  ]

@NgModule({
  declarations: [Pages],
  exports: [Pages],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    FormsModule
  ]
})
export class PagesModule {}
