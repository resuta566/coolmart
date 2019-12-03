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


  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private route: ActivatedRoute,
    private router: Router,
    private paymentMethods: PaymentService
    ) {
      this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
        console.log(params);
        if(params){
         if(params.acceptedTermsCondition){
          console.log(true);
        }else{
          this.notyf.error(`You didn't accept to the Terms and Condition! \nRe-directed to Checkout.`);
          this.router.navigate(['/checkout'], {queryParams:{ from: 'payment_option_failed' }})
            console.log(false);
          }
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

  payOnPaypal(){
    this.paymentMethods.paypalPaymentMethod();
  }

}
