import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';

import { ShopComponent } from '@app/shop/shop.component';
import { ShopItemComponent } from '@app/shop/shop-item/shop-item.component';
import { MaterialModule } from '../material.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { HomeModule } from '../home.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopComponent,
    ShopItemComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    FormsModule,
    HomeModule
  ]
})
export class ShopModule { }
