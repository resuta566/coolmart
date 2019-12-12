import { Component, OnInit } from '@angular/core';
import { CancelService } from '@app/_service/order/cancel/cancel.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.component.html',
  styleUrls: ['./cancelled-order.component.scss']
})
export class CancelledOrderComponent implements OnInit {

  apiUrl = `${environment.apiUrl}`;
  orderItemId: number;
  cancelledData: any;
  constructor(
    private route: ActivatedRoute,
    private cancelService: CancelService
  ) {
    this.route.paramMap.pipe().subscribe(param=>{
      this.orderItemId = +param.get('transactionId');
      this.cancelService.cancelViewItem(this.orderItemId).pipe().subscribe((data:any) =>{
        this.cancelledData = data;
        console.log(this.cancelledData);
      })
    })
   }

  ngOnInit() {
  }

}
