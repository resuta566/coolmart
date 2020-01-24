import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AboutUsComponent } from '../../pages/about-us/about-us.component';
import { ContactUsComponent } from '../../pages/contact-us/contact-us.component';
import { ErrorpagesComponent } from '../../pages/errorpages/errorpages.component';
import { TermsConditionsComponent } from '../../pages/terms-conditions/terms-conditions.component';
import { FaqComponent } from '../../pages/faq/faq.component';
import { AlertModule } from '../alert.module';
import { RouterModule } from '@angular/router';
import { StoreLocationComponent } from '@app/pages/store-location/store-location.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TrackComponent } from '@app/dashboard/track/track.component';
import { EmailVerificationComponent } from '@app/pages/email-verification/email-verification.component';

const Pages = [
  FaqComponent,
  AboutUsComponent,
  ContactUsComponent,
  ErrorpagesComponent,
  StoreLocationComponent,
  TermsConditionsComponent,
  TrackComponent,
  EmailVerificationComponent
];

@NgModule({
  declarations: [Pages],
  exports: [Pages],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AlertModule,
    RouterModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}
