import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from '@app/shop/shop.component';
import { ShopItemComponent } from '@app/shop/shop-item/shop-item.component';
import { ShopItemResolverService } from '@app/_service/resolver/shop/shop-item/shop-item-resolver.service';


const routes: Routes = [
  { path: '' ,
    children:[
      {
        path: '' ,
        component: ShopComponent,
        data:{
          num: 2
        }
      },
      {
        path: 'item/:slug' ,
        component: ShopItemComponent,
        resolve:{
          data : ShopItemResolverService
        },
        data:{
          num: 4
        }
      },
      {
        path: 'item/:brandname/:slug' ,
        component: ShopItemComponent,
        resolve:{
          data : ShopItemResolverService
        },
        data:{
          num: 4
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
