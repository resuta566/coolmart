import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from '@app/dashboard/order/order.component';
import { ReturnsComponent } from '@app/dashboard/order/returns/returns.component';
import { CancellationsComponent } from '@app/dashboard/order/cancellations/cancellations.component';
import { ReviewsComponent } from '@app/dashboard/order/reviews/reviews.component';
import { WriteReviewComponent } from '@app/dashboard/order/reviews/write-review/write-review.component';
import { PaypalComponent } from '@app/dashboard/checkout/payment-options-checkout/options/paypal/paypal.component';
import { ViewOrderComponent } from '@app/dashboard/order/view-order/view-order.component';
import { CancelOrderComponent } from '@app/dashboard/order/cancellations/cancel-order/cancel-order.component';
import { CancelledOrderComponent } from '@app/dashboard/order/cancellations/cancelled-order/cancelled-order.component';
import { ReturnOrderComponent } from '@app/dashboard/order/returns/return-order/return-order.component';
import { ReturnedOrderComponent } from '@app/dashboard/order/returns/returned-order/returned-order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/_modules/material.module';
import { StarRatingComponent } from '@app/_components/star-rating/star-rating.component';
import { StarRatingReviewComponent } from '@app/_components/star-rating-reviews/star-rating-reviews.component';


@NgModule({
  declarations: [
    OrderComponent,
    ReturnsComponent,
    CancellationsComponent,
    ReviewsComponent,
    WriteReviewComponent,
    PaypalComponent,
    ViewOrderComponent,
    CancelOrderComponent,
    CancelledOrderComponent,
    ReturnOrderComponent,
    ReturnedOrderComponent,
    StarRatingComponent,
    StarRatingReviewComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class OrderModule { }
