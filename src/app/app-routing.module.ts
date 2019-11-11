import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index/home/home.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { CompareComponent } from './pages/compare/compare.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { TrackComponent } from './dashboard/track/track.component';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ErrorpagesComponent } from './pages/errorpages/errorpages.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { FaqComponent } from './pages/faq/faq.component';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignComponent } from './pages/sign/sign.component';
import { AuthGuard } from './_helpers';
const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";
const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'cart' , component: CartComponent, canActivate: [AuthGuard], data: {title: `Cart${htmlTitle}`} },
  { path: 'compare' , component: CompareComponent, data: {title: 'Compare' + htmlTitle} },
  { path: 'wishlist' , component: WishlistComponent, canActivate: [AuthGuard], data: {title: 'Wishlist' + htmlTitle} },
  { path: 'checkout' , component: CheckoutComponent, canActivate: [AuthGuard], data: {title: 'Checkout' + htmlTitle} },
  { path: 'shop' , component: ShopComponent },
  { path: 'shop/:search' , component: ShopComponent },
  { path: 'shop/shop-item/:slug' , component: ShopItemComponent },
  { path: 'sign_in' , component: SignComponent, data: {title: 'Register / Sign In' + htmlTitle} },
  { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard' + htmlTitle} },
  { path: 'pages',
      children: [
        { path: 'terms-and-conditions' , component: TermsConditionsComponent, data: {title: 'Terms and Conditions' + htmlTitle} },
        { path: 'contact-us' , component: ContactUsComponent, data: {title: 'Contact Us' + htmlTitle} },
        { path: 'about-us' , component: AboutUsComponent, data: {title: 'About Us' + htmlTitle} },
        { path: 'frequently-ask-questions' , component: FaqComponent, data: {title: 'Frequently Ask Questions' + htmlTitle} },
        { path: 'store-location' , component: StoreLocationComponent, data: {title: 'Store Location' + htmlTitle} },
        { path: 'track' , component: TrackComponent, data: {title: 'Track your Order' + htmlTitle} },
        { path: 'not-found', component: ErrorpagesComponent, data: {title: 'Page Not Found' + htmlTitle} },
      ]
},

  { path: '**', redirectTo: 'pages/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
