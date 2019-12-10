import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/_service/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  showAll = false;
  orderId: any;
  successData: any;
  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.currentUser = this.authenticationService.currentUserValue.user;
    this.route.paramMap.pipe().subscribe(param => {
      console.log(param.get('transactionId'));
      this.orderId = param.get('transactionId');
      this.orderService.oneOrder(this.orderId).pipe().subscribe((data: any)=>{
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
