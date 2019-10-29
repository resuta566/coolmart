import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesModule } from './_modules/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { TrackComponent } from './dashboard/track/track.component';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { HomeModule } from './_modules/home.module';
import { StoreLocationComponent } from './pages/store-location/store-location.component';
import { OwlModule } from 'ngx-owl-carousel';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor, ErrorInterceptor } from '@app/_helpers';
import { NgxGalleryModule } from 'ngx-gallery';
import { GalleryComponent } from './shop/shop-item/gallery/gallery.component';

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
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    PagesModule,
    HomeModule,
    HttpClientModule,
    OwlModule,
    FormsModule,
    NgxGalleryModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
