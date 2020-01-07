import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionsComponent } from '@app/pages/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from '@app/pages/contact-us/contact-us.component';
import { AboutUsComponent } from '@app/pages/about-us/about-us.component';
import { FaqComponent } from '@app/pages/faq/faq.component';
import { StoreLocationComponent } from '@app/pages/store-location/store-location.component';
import { TrackComponent } from '@app/dashboard/track/track.component';
import { EmailVerificationComponent } from '@app/pages/email-verification/email-verification.component';
import { ErrorpagesComponent } from '@app/pages/errorpages/errorpages.component';


const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'not-found' },
      {
        path: 'terms-and-conditions' ,
        component: TermsConditionsComponent,
        data: {
          title: 'Terms and Conditions' + htmlTitle
        }
      },
      {
        path: 'contact-us' ,
        component: ContactUsComponent,
        data: {
          title: 'Contact Us' + htmlTitle
        }
      },
      {
        path: 'about-us' ,
        component: AboutUsComponent,
        data: {
          title: 'About Us' + htmlTitle
        }
      },
      {
        path: 'frequently-ask-questions' ,
        component: FaqComponent,
        data: {
          title: 'Frequently Ask Questions' + htmlTitle
        }
      },
      {
        path: 'store-location' ,
        component: StoreLocationComponent,
        data: {
          num: 4,
          title: 'Store Location' + htmlTitle
        }
      },
      {
        path: 'track' ,
        component: TrackComponent,
        data: {
          title: 'Track your Order' + htmlTitle
        }
      },
      {
        path: 'email-verification',
        component: EmailVerificationComponent,
        data: {
          title: 'Verify Email'
        } },
      {
        path: 'not-found',
        component: ErrorpagesComponent,
        data: {
          num: 3,
          title: 'Page Not Found' + htmlTitle
        }
      }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
