import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    data: {
      num: 10,
      title: 'My Orders'
    }
  },
  {
    path: 'view-order/:transactionId',
    component: ViewOrderComponent,
    data: {
      num: 18,
      title: 'View My Order'
    }
  },
  {
    path: 'cancel-order/:cartId',
    component: CancelOrderComponent,
    data: {
      num: 20,
      title: 'Cancel My Order'
    }
  },
  {
    path: 'return-order/:cartId',
    component: ReturnOrderComponent,
    data: {
      num: 21,
      title: 'Return My Returns'
    }
  },
  {
    path: 'returns',
    component: ReturnsComponent,
    data: {
      num: 22,
      title: 'My Returns'
    }
  },
  {
    path: 'returns/returned-order/:transactionId',
    component: ReturnedOrderComponent ,
    data: {
      num: 23,
      title: 'My Returned Order'
    }
  },
  {
    path: 'cancellations',
    component: CancellationsComponent,
    data: {
      num: 12,
      title: 'My Cancellations'
    }
  },
  {
    path: 'cancellations/cancelled-order/:transactionId',
    component: CancelledOrderComponent,
    data: {
      num: 12,
      title: 'My Cancelled Order'
    }
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    data: {
      num: 13,
      title: 'My Reviews'
    }
  },
  {
    path: 'reviews/write-review/:id',
    component: WriteReviewComponent,
    data: {
      num: 15,
      title: 'Write Review'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
