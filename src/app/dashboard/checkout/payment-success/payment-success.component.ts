import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/_service/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_service';
import { environment } from '@environments/environment';
import { PaymentService } from '@app/_service/payment/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

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
    this.route.paramMap.pipe().subscribe(param => {
      console.log(param.get('transactionId'));
      this.orderId = param.get('transactionId');
      this.paymentService.paymentSuccess(this.orderId).pipe().subscribe((data: any)=>{
        this.successData = data;
        console.log(this.successData);
      }
      );
    })
  }

  ngOnInit() {
  }

  successOrder(){

  }

  show(){
    this.showAll = !this.showAll;
  }
}
