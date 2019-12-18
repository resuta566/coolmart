import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { PaymentService } from '@app/_service/payment/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-payment-options-checkout',
  templateUrl: './payment-options-checkout.component.html',
  styleUrls: ['./payment-options-checkout.component.scss']
})
export class PaymentOptionsCheckoutComponent implements OnInit, OnDestroy {

  paypalOption = false;
  codOption = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  selected = false;
  orderId: number;
  orderDetails: any;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private route: ActivatedRoute,
    private router: Router,
    private paymentMethods: PaymentService
    ) {
      this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
        this.orderId = params.orderTranscationId;
        if(params){
          if(this.orderId){
            this.paymentMethods.afterPlaceOrder(this.orderId).pipe().subscribe(response => {
              this.orderDetails = response;
              console.log(this.orderDetails);
              if(!this.orderDetails.address.status) {
                 this.router.navigate(['/pages/not-found']); //If the Transaction status is false redirect
              }
            })
          }else{
            this.router.navigate(['/pages/not-found']);
          }
        }else{
          this.router.navigate(['/pages/not-found']);
        }
      });
     }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true); //Prevent Memory Leaks
    this.destroy$.unsubscribe();
  }

  paypal(){
    this.paypalOption = true;
    this.codOption = false;
  }
  cod(){
    this.codOption = true;
    this.paypalOption = false;
  }

  payOnPaypal(){
    this.selected = true;
    this.paymentMethods.paypalPaymentMethod(this.orderId).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
      if(data){
        window.location.href = data.paypal_link;
      }
    },err=>{
      console.log(err);
      // this.notyf.error(err);
      this.selected = false;
    });
  }
  payOnCOD(){
    this.selected = true;
    this.paymentMethods.codPaymentMethod(this.orderId).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
      this.router.navigate(['/checkout/payment-success', data.transaction_id]);
    },err=>{
      console.log(err);
      // this.notyf.error(err);
      this.selected = false;
    });
  }

}
