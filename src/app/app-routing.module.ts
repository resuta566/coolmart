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

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {
    path: 'cart' , component: CartComponent, canActivate: [AuthGuard]
  },
  {path: 'compare' , component: CompareComponent},
  {path: 'wishlist' , component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'checkout' , component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'track' , component: TrackComponent},
  {path: 'shop/:search' , component: ShopComponent},
  {path: 'shop' , component: ShopComponent},
  {path: 'shop/shop-item/:slug' , component: ShopItemComponent},
  {path: 'sign_in' , component: SignComponent},
  {path: 'terms-and-conditions' , component: TermsConditionsComponent},
  {path: 'contact-us' , component: ContactUsComponent},
  {path: 'about-us' , component: AboutUsComponent},
  {path: 'frequently-ask-questions' , component: FaqComponent},
  {path: 'store-location' , component: StoreLocationComponent},
  {path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},


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
