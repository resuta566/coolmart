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

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './dashboard/account/account.component';
import { AddressBookComponent } from './dashboard/account/address-book/address-book.component';
import { PaymentOptionsComponent } from './dashboard/account/payment-options/payment-options.component';
import { ProfileComponent } from './dashboard/account/profile/profile.component';
import { AddressComponent } from './dashboard/account/address-book/address/address.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { CartItemUpdateComponent } from './dashboard/cart/cart-item-update/cart-item-update.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { PaymentSuccessComponent } from './dashboard/checkout/payment-success/payment-success.component';
import { PaymentOptionsCheckoutComponent } from './dashboard/checkout/payment-options-checkout/payment-options-checkout.component';
import { TrackComponent } from './dashboard/track/track.component';
import { OrderComponent } from './dashboard/order/order.component';
import { ReturnsComponent } from './dashboard/order/returns/returns.component';
import { CancellationsComponent } from './dashboard/order/cancellations/cancellations.component';
import { ReviewsComponent } from './dashboard/order/reviews/reviews.component';
import { WriteReviewComponent } from './dashboard/order/reviews/write-review/write-review.component';
import { ViewOrderComponent } from './dashboard/order/view-order/view-order.component';
import { CancelOrderComponent } from './dashboard/order/cancellations/cancel-order/cancel-order.component';
import { CancelledOrderComponent } from './dashboard/order/cancellations/cancelled-order/cancelled-order.component';
import { ReturnedOrderComponent } from './dashboard/order/returns/returned-order/returned-order.component';
import { ReturnOrderComponent } from './dashboard/order/returns/return-order/return-order.component';

import { ShopItemResolverService } from './_service/resolver/shop/shop-item/shop-item-resolver.service';
import { CartResolverService } from './_service/resolver/cart/cart-resolver.service';

const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";
const routes: Routes = [
  { path: '' , component: HomeComponent, data:{ num: 1} },
  { path: 'cart' , component: CartComponent, canActivate: [AuthGuard], data: {title: `Cart${htmlTitle}`} },
  { path: 'cart/update-item/:itemId' , component: CartItemUpdateComponent, canActivate: [AuthGuard],resolve:{data: CartResolverService}},
  { path: 'compare' , component: CompareComponent, data: {title: 'Compare' + htmlTitle} },
  { path: 'wishlist' , component: WishlistComponent, canActivate: [AuthGuard], data: {title: 'Wishlist' + htmlTitle} },
  { path: 'checkout' , component: CheckoutComponent, canActivate: [AuthGuard], data: {title: 'Checkout' + htmlTitle} },
  { path: 'checkout/payment-options' , component: PaymentOptionsCheckoutComponent, canActivate: [AuthGuard], data: {num: 16, title: 'Order Payment Options'} },
  { path: 'checkout/payment-success/:transactionId' , component: PaymentSuccessComponent, canActivate: [AuthGuard], data: {num: 17, title: 'Success Purchase'} },
  { path: 'shop' , component: ShopComponent, data:{ num: 2} },
  { path: 'shop/shop-item/:slug' , component: ShopItemComponent, resolve:{ data : ShopItemResolverService }, data:{ num: 4} },
  { path: 'shop/shop-item/:brandname/:slug' , component: ShopItemComponent, resolve:{ data : ShopItemResolverService }, data:{ num: 4} },
  { path: 'sign_in' , component: SignComponent, canActivate: [LoggedInGuard], data: {num: 14,title: 'Register / Sign In' + htmlTitle} },
  { path: 'dashboard' , component: DashboardComponent,
  canActivate: [AuthGuard],
  data: { num: 5, title: 'Dashboard' + htmlTitle},
      children:[
        { path: '', pathMatch: 'full', redirectTo: 'account'},
        { path: 'account', component: AccountComponent, data: { num: 6, title: 'Manage My Account'} },
        { path: 'account/profile', component: ProfileComponent, data: { num: 7, title: 'My Profile'}  },
        { path: 'account/address-book', component: AddressBookComponent, data: { num: 8, title: 'My Address Book'}  },
        { path: 'account/address-book/address', component: AddressComponent, data: { num: 19, title:'View My Address'}  },
        { path: 'account/address-book/address/update/:addressId', component: AddressComponent, data: { num: 19, title:'Update Address'}  },
        { path: 'account/payment-options', component: PaymentOptionsComponent, data:{ num: 9, title: 'Select Payment Option'} },
        { path: 'order', component: OrderComponent, data:{ num: 10, title: 'My Orders'} },
        { path: 'order/view-order/:transactionId', component: ViewOrderComponent, data:{ num: 18, title: 'View My Order'} },
        { path: 'order/cancel-order/:cartId', component: CancelOrderComponent, data:{ num: 20, title: 'Cancel My Order'} },
        { path: 'order/return-order/:cartId', component: ReturnOrderComponent,data:{ num: 21, title: 'Return My Returns'} },
        { path: 'order/returns', component: ReturnsComponent,data:{ num: 22, title: 'My Returns'} },
        { path: 'order/returns/returned-order/:transactionId', component: ReturnedOrderComponent ,data:{ num: 23, title: 'My Returned Order'} },
        { path: 'order/cancellations', component: CancellationsComponent, data:{ num: 12, title: 'My Cancellations'} },
        { path: 'order/cancellations/cancelled-order/:transactionId', component: CancelledOrderComponent, data:{ num: 12, title: 'My Cancelled Order'} },
        { path: 'order/reviews', component: ReviewsComponent, data:{ num: 13, title: 'My Reviews'} },
        { path: 'order/reviews/write-review/:id', component: WriteReviewComponent, data:{ num: 15, title: 'Write Review'} }
      ] },
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
