import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AccountComponent } from '@app/dashboard/account/account.component';
import { ProfileComponent } from '@app/dashboard/account/profile/profile.component';
import { AddressBookComponent } from '@app/dashboard/account/address-book/address-book.component';
import { PaymentOptionsComponent } from '@app/dashboard/account/payment-options/payment-options.component';
import { OrderComponent } from '@app/dashboard/order/order.component';
import { ReturnsComponent } from '@app/dashboard/order/returns/returns.component';
import { CancellationsComponent } from '@app/dashboard/order/cancellations/cancellations.component';
import { ReviewsComponent } from '@app/dashboard/order/reviews/reviews.component';
import { WriteReviewComponent } from '@app/dashboard/order/reviews/write-review/write-review.component';
import { PaypalComponent } from '@app/dashboard/checkout/payment-options-checkout/options/paypal/paypal.component';
import { ViewOrderComponent } from '@app/dashboard/order/view-order/view-order.component';
import { AddressComponent } from '@app/dashboard/account/address-book/address/address.component';
import { CancelOrderComponent } from '@app/dashboard/order/cancellations/cancel-order/cancel-order.component';
import { CancelledOrderComponent } from '@app/dashboard/order/cancellations/cancelled-order/cancelled-order.component';
import { ReturnOrderComponent } from '@app/dashboard/order/returns/return-order/return-order.component';
import { ReturnedOrderComponent } from '@app/dashboard/order/returns/returned-order/returned-order.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlertModule } from '../alert.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { StarRatingComponent } from '@app/_components/star-rating/star-rating.component';
import { StarRatingReviewComponent } from '@app/_components/star-rating-reviews/star-rating-reviews.component';


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    AddressBookComponent,
    PaymentOptionsComponent,
    OrderComponent,
    ReturnsComponent,
    CancellationsComponent,
    DashboardComponent,
    ReviewsComponent,
    WriteReviewComponent,
    PaypalComponent,
    ViewOrderComponent,
    AddressComponent,
    CancelOrderComponent,
    CancelledOrderComponent,
    ReturnOrderComponent,
    ReturnedOrderComponent,
    StarRatingComponent,
    StarRatingReviewComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AlertModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxGalleryModule
  ]
})
export class DashboardModule { }
