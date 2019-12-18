import { Component, OnInit } from '@angular/core';
import { ReturnService } from '@app/_service/order/return/return.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-returned-order',
  templateUrl: './returned-order.component.html',
  styleUrls: ['./returned-order.component.scss']
})
export class ReturnedOrderComponent implements OnInit {

  apiUrl = `${environment.apiUrl}`;
  returnedData: any;
  cartId: number;
  constructor(
    private returnService: ReturnService,
    private route: ActivatedRoute
    ) {
      this.route.paramMap.pipe().subscribe(param=>{
        this.cartId = +param.get('transactionId');
      })
    }

  ngOnInit() {
    this.returnData();
  }

  returnData(){
    this.returnService.returnViewItem(this.cartId).pipe().subscribe(data=>{
      this.returnedData = data;
      console.log(this.returnedData);

    });
  }
}
