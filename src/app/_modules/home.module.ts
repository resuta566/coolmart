import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgxGalleryModule } from 'ngx-gallery';
import { HomeComponent } from '../index/home/home.component';
import { HomecarouselComponent } from '../index/home/home-carousel/homecarousel.component';
import { HomedealsComponent } from '../index/home/home-deals/homedeals.component';
import { HometabsComponent } from '../index/home/home-tabs/hometabs.component';
import { HomeProductSectionComponent } from '../index/home/home-product-section/home-product-section.component';
import { HomeBestSellerComponent } from '@app/index/home/home-best-seller/home-best-seller.component';
import { HomeTopThisMonthComponent } from '@app/index/home/home-top-this-month/home-top-this-month.component';
import { HomeBottomProductsComponent } from '@app/index/home/home-bottom-products/home-bottom-products.component';
import { HomeBottomBrandsCarouselComponent } from '@app/index/home/home-bottom-brands-carousel/home-bottom-brands-carousel.component';
import { HomeProductsCardComponent } from '@app/index/home/home-products-card/home-products-card.component';
import { AddtocartComponent } from '@app/_components/addtocart/addtocart.component';
import { AlertModule } from './alert.module';
import { RouterModule } from '@angular/router';


  const Home = [
    HomeComponent,
    HomecarouselComponent,
    HomedealsComponent,
    HometabsComponent,
    HomeProductSectionComponent,
    HomeBestSellerComponent,
    HomeTopThisMonthComponent,
    HomeBottomProductsComponent,
    HomeBottomBrandsCarouselComponent,
    HomeProductsCardComponent,
    AddtocartComponent
  ]

@NgModule({
  declarations: [Home],
  imports:[
    RouterModule,
    BrowserModule,
    CommonModule,
    NgxGalleryModule,
    AlertModule
  ],
  exports: [Home]
})
export class HomeModule {}
