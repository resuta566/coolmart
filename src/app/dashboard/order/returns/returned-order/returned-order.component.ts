import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReturnService } from '@app/_service/order/return/return.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-returned-order',
  templateUrl: './returned-order.component.html',
  styleUrls: ['./returned-order.component.scss']
})
export class ReturnedOrderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  apiUrl = `${environment.apiUrl}`;
  returnedData: any;
  cartId: number;
  constructor(
    private returnService: ReturnService,
    private route: ActivatedRoute
    ) {
      this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param => {
        this.cartId = +param.get('transactionId');
      });
    }

  ngOnInit() {
    this.returnData();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  returnData() {
    this.returnService.returnViewItem(this.cartId).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.returnedData = data;
      console.log(this.returnedData);

    });
  }
}
