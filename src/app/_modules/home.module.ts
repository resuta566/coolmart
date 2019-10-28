import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'ngx-owl-carousel';
import {
  HomeComponent,
  HomecarouselComponent,
  HomedealsComponent,
  HometabsComponent,
  HomeProductSectionComponent,
  HomeBestSellerComponent,
  HomeTopThisMonthComponent,
  HomeBottomProductsComponent,
  HomeBottomBrandsCarouselComponent,
  HomeProductsCardComponent
  } from '../home';

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
    HomeProductsCardComponent
  ]

@NgModule({
  declarations: [Home],
  imports:[
    BrowserModule,
    CommonModule,
    OwlModule
  ],
  exports: [Home]
})
export class HomeModule {}
