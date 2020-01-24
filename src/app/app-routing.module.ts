import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoggedInGuard } from '@app/_helpers';

import { HomeComponent } from './index/home/home.component';

import { SignComponent } from './pages/sign/sign.component';
import { CompareComponent } from './pages/compare/compare.component';

import { CartComponent } from './dashboard/cart/cart.component';
import { CartItemUpdateComponent } from './dashboard/cart/cart-item-update/cart-item-update.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { PaymentSuccessComponent } from './dashboard/checkout/payment-success/payment-success.component';
import { PaymentOptionsCheckoutComponent } from './dashboard/checkout/payment-options-checkout/payment-options-checkout.component';

import { CartResolverService } from './_service/resolver/cart/cart-resolver.service';

const htmlTitle = ' | Cool Mart : Online Aircon Shopping with Great Prices!';

const routes: Routes = [
  {
    path: '' ,
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      num: 1
    }
  },
  {
    path: 'cart' ,
    component: CartComponent,
    canActivate: [AuthGuard],
    data: {
      title: `Cart${htmlTitle}`
    }
  },
  {
    path: 'cart/update-item/:itemId' ,
    component: CartItemUpdateComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: CartResolverService
    }
  },
  {
    path: 'compare' ,
    component: CompareComponent,
    data: {
      title: 'Compare' + htmlTitle
    }
  },
  {
    path: 'wishlist' ,
    component: WishlistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Wishlist' + htmlTitle
    }
  },
  {
    path: 'checkout' ,
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Checkout' + htmlTitle
    }
  },
  {
    path: 'checkout/payment-options' ,
    component: PaymentOptionsCheckoutComponent,
    canActivate: [AuthGuard],
    data: {
      num: 16,
      title: 'Order Payment Options'
    }
  },
  {
    path: 'checkout/payment-success/:transactionId' ,
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard],
    data: {
      num: 17,
      title: 'Success Purchase'
    }
  },
  {
    path: 'shop' ,
    loadChildren: () =>
      import('@app/_modules/shop/shop.module')
      .then(module => module.ShopModule)
  },
  {
    path: 'sign_in' ,
    component: SignComponent,
    canActivate: [LoggedInGuard],
    data: {
      num: 14,
      title: 'Register / Sign In' + htmlTitle
    }
  },
  {
    path: 'forgot-password' ,
    loadChildren: () =>
      import(`@app/_modules/pages/forgot-password/forgot-password.module`)
      .then(module => module.ForgotPasswordModule)
  },
  {
    path: 'dashboard' ,
    loadChildren: () =>
      import(`@app/_modules/dashboard/dashboard.module`)
      .then( module => module.DashboardModule)
  },
  {
    path: 'pages' ,
    loadChildren: () =>
      import(`@app/_modules/pages/pages.module`)
      .then(module => module.PagesModule)
  },

  {
    path: '**',
    redirectTo: 'pages/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
