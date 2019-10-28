import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { TrackComponent } from './dashboard/track/track.component';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import {
  FaqComponent,
  AboutUsComponent,
  ContactUsComponent,
  ErrorpagesComponent,
  SignComponent,
  TermsConditionsComponent
  } from './pages';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'cart' , component: CartComponent},
  {path: 'compare' , component: CompareComponent},
  {path: 'wishlist' , component: WishlistComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'track' , component: TrackComponent},
  {path: 'shop' , component: ShopComponent},
  {path: 'shop-item/:slug' , component: ShopItemComponent},
  {path: 'sign_in_up' , component: SignComponent},
  {path: 'terms-and-conditions' , component: TermsConditionsComponent},
  {path: 'contact-us' , component: ContactUsComponent},
  {path: 'about-us' , component: AboutUsComponent},
  {path: 'frequently-ask-questions' , component: FaqComponent},
  {path: 'store-location' , component: StoreLocationComponent},
  {path: 'dashboard' , component: DashboardComponent},



  { path: 'not-found', component: ErrorpagesComponent},
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
