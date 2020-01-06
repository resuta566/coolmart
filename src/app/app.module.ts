import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './_modules/material.module';

import { NgxGalleryModule } from 'ngx-gallery';

import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';
import { DigitOnlyDirective } from '@app/_components/directives/digit-only.directive';
import { NOTYF, notyfFactory } from '@app/_helpers/notyf.token';
import { JwtInterceptor, ErrorInterceptor } from '@app/_helpers';

import { HomeModule } from './_modules/home.module';
import { AlertModule } from '@app/_modules/alert.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FooterComponent } from './index/footer/footer.component';

import { CompareComponent } from './pages/compare/compare.component';

import { ShopItemResolverService } from './_service/resolver/shop/shop-item/shop-item-resolver.service';

import { CartComponent } from './dashboard/cart/cart.component';
import { CartItemUpdateComponent } from './dashboard/cart/cart-item-update/cart-item-update.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { PaymentOptionsCheckoutComponent } from './dashboard/checkout/payment-options-checkout/payment-options-checkout.component';
import { PaymentSuccessComponent } from './dashboard/checkout/payment-success/payment-success.component';

import { SignComponent } from '@app/pages/sign/sign.component';
import { InComponent } from './pages/sign/in/in.component';
import { UpComponent } from './pages/sign/up/up.component';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };

}

@NgModule({
  declarations: [
    AppComponent,
    DigitOnlyDirective,
    NavbarComponent,
    FooterComponent,
    CompareComponent,
    ConfirmationDialogComponent,
    CartComponent,
    CartItemUpdateComponent,
    WishlistComponent,
    CheckoutComponent,
    PaymentOptionsCheckoutComponent,
    PaymentSuccessComponent,
    SignComponent,
    InComponent,
    UpComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    HomeModule,
    HttpClientModule,
    NgxGalleryModule,
    AlertModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  exports:[
    DigitOnlyDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    { provide: NOTYF, useFactory: notyfFactory },
    ShopItemResolverService,
    DigitOnlyDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
