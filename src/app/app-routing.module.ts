import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoggedInGuard } from '@app/_helpers';

import { HomeComponent } from './index/home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';

import { SignComponent } from './pages/sign/sign.component';
import { CompareComponent } from './pages/compare/compare.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ErrorpagesComponent } from './pages/errorpages/errorpages.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { FaqComponent } from './pages/faq/faq.component';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { SendEmailComponent } from './pages/forgot-password/send-email/send-email.component';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';

import { CartComponent } from './dashboard/cart/cart.component';
import { CartItemUpdateComponent } from './dashboard/cart/cart-item-update/cart-item-update.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { PaymentSuccessComponent } from './dashboard/checkout/payment-success/payment-success.component';
import { PaymentOptionsCheckoutComponent } from './dashboard/checkout/payment-options-checkout/payment-options-checkout.component';
import { TrackComponent } from './dashboard/track/track.component';

import { CartResolverService } from './_service/resolver/cart/cart-resolver.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";
const routes: Routes = [
  { path: '' ,pathMatch: 'full', component: HomeComponent, data:{ num: 1} },
  { path: 'cart' , component: CartComponent, canActivate: [AuthGuard], data: {title: `Cart${htmlTitle}`} },
  { path: 'cart/update-item/:itemId' , component: CartItemUpdateComponent, canActivate: [AuthGuard],resolve:{data: CartResolverService}},
  { path: 'compare' , component: CompareComponent, data: {title: 'Compare' + htmlTitle} },
  { path: 'wishlist' , component: WishlistComponent, canActivate: [AuthGuard], data: {title: 'Wishlist' + htmlTitle} },
  { path: 'checkout' , component: CheckoutComponent, canActivate: [AuthGuard], data: {title: 'Checkout' + htmlTitle} },
  { path: 'checkout/payment-options' , component: PaymentOptionsCheckoutComponent, canActivate: [AuthGuard], data: {num: 16, title: 'Order Payment Options'} },
  { path: 'checkout/payment-success/:transactionId' , component: PaymentSuccessComponent, canActivate: [AuthGuard], data: {num: 17, title: 'Success Purchase'} },
  { path: 'shop' ,
    loadChildren: () =>
    import('@app/_modules/shop/shop.module').then(
      module => module.ShopModule
    )
  },
  { path: 'sign_in' , component: SignComponent, canActivate: [LoggedInGuard], data: {num: 14,title: 'Register / Sign In' + htmlTitle} },
  { path: 'forgot-password' , component: ForgotPasswordComponent,
        canActivate: [LoggedInGuard],
        children:[
          {path: '',pathMatch: 'full',redirectTo: 'send-email'},
          {path: 'send-email', component: SendEmailComponent, data: {num: 99, title: 'Forgot Password' + htmlTitle}},
          {path: 'reset/:token', component: ResetPasswordComponent, data: {num: 99, title: 'Reset Password' + htmlTitle}}
        ]
  },
  { path: 'dashboard' ,
    loadChildren: () =>
    import(`@app/_modules/dashboard/dashboard.module`).then(
      module => module.DashboardModule
    )
  },
  { path: 'pages',
      children: [
        { path: '',pathMatch: 'full', redirectTo: 'not-found' },
        { path: 'terms-and-conditions' , component: TermsConditionsComponent, data: {title: 'Terms and Conditions' + htmlTitle} },
        { path: 'contact-us' , component: ContactUsComponent, data: {title: 'Contact Us' + htmlTitle} },
        { path: 'about-us' , component: AboutUsComponent, data: {title: 'About Us' + htmlTitle} },
        { path: 'frequently-ask-questions' , component: FaqComponent, data: {title: 'Frequently Ask Questions' + htmlTitle} },
        { path: 'store-location' , component: StoreLocationComponent, data: {num: 4, title: 'Store Location' + htmlTitle} },
        { path: 'track' , component: TrackComponent, data: {title: 'Track your Order' + htmlTitle} },
        { path: 'email-verification', component: EmailVerificationComponent, data: {title: 'Verify Email'} },
        { path: 'not-found', component: ErrorpagesComponent, data: { num: 3, title: 'Page Not Found' + htmlTitle} }
      ]
},

  { path: '**', redirectTo: 'pages/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
