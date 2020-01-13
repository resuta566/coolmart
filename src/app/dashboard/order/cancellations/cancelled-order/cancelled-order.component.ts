import { Component, OnInit, OnDestroy } from '@angular/core';
import { CancelService } from '@app/_service/order/cancel/cancel.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.component.html',
  styleUrls: ['./cancelled-order.component.scss']
})
export class CancelledOrderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  apiUrl = `${environment.apiUrl}`;
  orderItemId: number;
  cancelledData: any;
  constructor(
    private route: ActivatedRoute,
    private cancelService: CancelService
  ) {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param=>{
      this.orderItemId = +param.get('transactionId');
      this.cancelService.cancelViewItem(this.orderItemId).pipe(takeUntil(this.destroy$)).subscribe((data:any) =>{
        this.cancelledData = data;
        console.log(this.cancelledData);
      })
    })
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
