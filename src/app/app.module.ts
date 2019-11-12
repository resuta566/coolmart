import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { PagesModule } from './_modules/pages.module';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FooterComponent } from './index/footer/footer.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { CompareComponent } from './pages/compare/compare.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { TrackComponent } from './dashboard/track/track.component';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { HomeModule } from './_modules/home.module';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor, ErrorInterceptor } from '@app/_helpers';
import { NgxGalleryModule } from 'ngx-gallery';
import { AlertModule } from '@app/_modules/alert.module';
import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';

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
    ConfirmationDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    PagesModule,
    HomeModule,
    HttpClientModule,
    NgxGalleryModule,
    AlertModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
