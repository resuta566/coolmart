import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@app/_service/order/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  orderId: number;
  orderData: any;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.route.paramMap.pipe().subscribe(param=>{
      console.log(param.get('transactionId'));
      this.orderId = +param.get('transactionId');
      this.orderService.oneOrder(this.orderId).pipe().subscribe(data =>{
        this.orderData = data;
        console.log(this.orderData);

      });

    });
  }

  ngOnInit() {
    let string = 'James Lester -- Tunasan';
    let spliter = string.split('--');
    console.log(spliter);

  }

}
