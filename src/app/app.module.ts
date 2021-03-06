import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

<<<<<<< HEAD
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
=======
import { MaterialModule } from './_modules/material.module';
>>>>>>> development

import { NgxGalleryModule } from 'ngx-gallery';

import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';
<<<<<<< HEAD
=======
import { StarRatingComponent } from './_components/star-rating/star-rating.component';
import { StarRatingReviewComponent } from './_components/star-rating-reviews/star-rating-reviews.component';
>>>>>>> development
import { NOTYF, notyfFactory } from '@app/_helpers/notyf.token';
import { JwtInterceptor, ErrorInterceptor } from '@app/_helpers';

import { PagesModule } from './_modules/pages.module';
import { HomeModule } from './_modules/home.module';
import { AlertModule } from '@app/_modules/alert.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FooterComponent } from './index/footer/footer.component';

import { CartComponent } from './dashboard/cart/cart.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { TrackComponent } from './dashboard/track/track.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { CompareComponent } from './pages/compare/compare.component';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { AccountComponent } from './dashboard/account/account.component';
import { ProfileComponent } from './dashboard/account/profile/profile.component';
import { AddressBookComponent } from './dashboard/account/address-book/address-book.component';
import { PaymentOptionsComponent } from './dashboard/account/payment-options/payment-options.component';
import { OrderComponent } from './dashboard/order/order.component';
import { ReturnsComponent } from './dashboard/order/returns/returns.component';
import { CancellationsComponent } from './dashboard/order/cancellations/cancellations.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';

import { ShopItemResolverService } from './_service/resolver/shop/shop-item/shop-item-resolver.service';
import { ReviewsComponent } from './dashboard/order/reviews/reviews.component';
=======
import { AccountComponent } from './dashboard/account/account.component';
import { ProfileComponent } from './dashboard/account/profile/profile.component';
import { AddressBookComponent } from './dashboard/account/address-book/address-book.component';
import { PaymentOptionsComponent } from './dashboard/account/payment-options/payment-options.component';
import { OrderComponent } from './dashboard/order/order.component';
import { ReturnsComponent } from './dashboard/order/returns/returns.component';
import { CancellationsComponent } from './dashboard/order/cancellations/cancellations.component';
import { ReviewsComponent } from './dashboard/order/reviews/reviews.component';
import { WriteReviewComponent } from './dashboard/order/reviews/write-review/write-review.component';

import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';

import { CompareComponent } from './pages/compare/compare.component';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';

import { ShopItemResolverService } from './_service/resolver/shop/shop-item/shop-item-resolver.service';
import { PaymentOptionsCheckoutComponent } from './dashboard/checkout/payment-options-checkout/payment-options-checkout.component';
import { PaypalComponent } from './dashboard/checkout/payment-options-checkout/options/paypal/paypal.component';
import { PaymentSuccessComponent } from './dashboard/checkout/payment-success/payment-success.component';
import { ViewOrderComponent } from './dashboard/order/view-order/view-order.component';
import { AddressComponent } from './dashboard/account/address-book/address/address.component';
import { DigitOnlyDirective } from './_components/directives/digit-only.directive';
import { CancelOrderComponent } from './dashboard/order/cancellations/cancel-order/cancel-order.component';
import { CancelledOrderComponent } from './dashboard/order/cancellations/cancelled-order/cancelled-order.component';
import { ReturnOrderComponent } from './dashboard/order/returns/return-order/return-order.component';
import { ReturnedOrderComponent } from './dashboard/order/returns/returned-order/returned-order.component';
import { CartItemUpdateComponent } from './dashboard/cart/cart-item-update/cart-item-update.component';
>>>>>>> development

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    CompareComponent,
    WishlistComponent,
    CheckoutComponent,
    TrackComponent,
    ShopComponent,
    ShopItemComponent,
    StoreLocationComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    AccountComponent,
    ProfileComponent,
    AddressBookComponent,
    PaymentOptionsComponent,
    OrderComponent,
    ReturnsComponent,
    CancellationsComponent,
    EmailVerificationComponent,
<<<<<<< HEAD
    ReviewsComponent
=======
    ReviewsComponent,
    WriteReviewComponent,
    StarRatingComponent,
    StarRatingReviewComponent,
    PaymentOptionsCheckoutComponent,
    PaypalComponent,
    PaymentSuccessComponent,
    ViewOrderComponent,
    AddressComponent,
    DigitOnlyDirective,
    CancelOrderComponent,
    CancelledOrderComponent,
    ReturnOrderComponent,
    ReturnedOrderComponent,
    CartItemUpdateComponent
>>>>>>> development
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    PagesModule,
    HomeModule,
    HttpClientModule,
    NgxGalleryModule,
    AlertModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
=======
    MaterialModule,
>>>>>>> development
    AppRoutingModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
<<<<<<< HEAD
=======
  ],
  exports:[
    DigitOnlyDirective
>>>>>>> development
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    { provide: NOTYF, useFactory: notyfFactory },
    ShopItemResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
