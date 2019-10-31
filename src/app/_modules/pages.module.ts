import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from '@app/_components';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { ErrorpagesComponent } from '../pages/errorpages/errorpages.component';
import { TermsConditionsComponent } from '../pages/terms-conditions/terms-conditions.component';
import { FaqComponent } from '../pages/faq/faq.component';
import { InComponent } from '../pages/sign/in/in.component';
import { SignComponent } from '../pages/sign/sign.component';
import { UpComponent } from '../pages/sign/up/up.component';
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
    TermsConditionsComponent,
    AlertComponent
  ]

@NgModule({
  declarations: [Pages],
  exports: [Pages],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule
  ]
})
export class PagesModule {}
