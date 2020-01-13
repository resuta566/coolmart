import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_service';
import { environment } from '@environments/environment';
import { PaymentService } from '@app/_service/payment/payment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit , OnDestroy{

  private destroy$: Subject<boolean> = new Subject<boolean>(); //Destroy Subscription to avoid memory leaks
  apiUrl = `${environment.apiUrl}`;
  showAll = false;
  orderId: any;
  successData: any;
  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {
    this.currentUser = this.authenticationService.currentUserValue.user;
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param => {
      this.orderId = param.get('transactionId');
      this.paymentService.paymentSuccess(this.orderId).pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
        this.successData = data;
      }
      );
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  successOrder(){

  }

  show(){
    this.showAll = !this.showAll;
  }
}
