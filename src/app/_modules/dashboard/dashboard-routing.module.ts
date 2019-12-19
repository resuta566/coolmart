import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '@app/dashboard/account/account.component';
import { ProfileComponent } from '@app/dashboard/account/profile/profile.component';
import { AddressBookComponent } from '@app/dashboard/account/address-book/address-book.component';
import { AddressComponent } from '@app/dashboard/account/address-book/address/address.component';
import { PaymentOptionsComponent } from '@app/dashboard/account/payment-options/payment-options.component';
import { OrderComponent } from '@app/dashboard/order/order.component';
import { ViewOrderComponent } from '@app/dashboard/order/view-order/view-order.component';
import { CancelOrderComponent } from '@app/dashboard/order/cancellations/cancel-order/cancel-order.component';
import { ReturnOrderComponent } from '@app/dashboard/order/returns/return-order/return-order.component';
import { ReturnsComponent } from '@app/dashboard/order/returns/returns.component';
import { ReturnedOrderComponent } from '@app/dashboard/order/returns/returned-order/returned-order.component';
import { CancellationsComponent } from '@app/dashboard/order/cancellations/cancellations.component';
import { CancelledOrderComponent } from '@app/dashboard/order/cancellations/cancelled-order/cancelled-order.component';
import { ReviewsComponent } from '@app/dashboard/order/reviews/reviews.component';
import { WriteReviewComponent } from '@app/dashboard/order/reviews/write-review/write-review.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AuthGuard } from '@app/_helpers';

const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";

const routes: Routes = [
    { path: '', component: DashboardComponent,
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
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
