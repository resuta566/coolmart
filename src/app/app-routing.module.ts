import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TrackComponent } from './track/track.component';
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

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'cart' , component: CartComponent},
  {path: 'compare' , component: CompareComponent},
  {path: 'wishlist' , component: WishlistComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'track' , component: TrackComponent},
  {path: 'shop' , component: ShopComponent},
  {path: 'shop-item' , component: ShopItemComponent},
  {path: 'sign_in_up' , component: SignComponent},
  {path: 'terms-and-conditions' , component: TermsConditionsComponent},
  {path: 'contact-us' , component: ContactUsComponent},
  {path: 'about-us' , component: AboutUsComponent},
  {path: 'frequently-ask-questions' , component: FaqComponent},
  {path: 'store-location' , component: StoreLocationComponent},



  { path: 'not-found', component: ErrorpagesComponent},
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
