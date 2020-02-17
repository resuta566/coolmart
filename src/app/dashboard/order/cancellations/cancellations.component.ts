import { Component, OnInit, OnDestroy } from '@angular/core';
import { CancelService } from '@app/_service/order/cancel/cancel.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-cancellations',
  templateUrl: './cancellations.component.html',
  styleUrls: ['./cancellations.component.scss']
})
export class CancellationsComponent implements OnInit, OnDestroy {

  apiUrl = `${environment.apiUrl}`;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  cancelOrders: any;
  cancelChangePage = '';
  constructor(
    private cancelService: CancelService
  ) { }

  ngOnInit() {
    this._cancelOrders();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  _cancelOrders() {
    this.cancelService.cancelOrders(this.cancelChangePage).pipe(takeUntil(this.destroy$)).subscribe(orders => {
      this.cancelOrders = orders;
    });
  }

  changePageCancellOrder(page: string) {
    this.cancelChangePage = page;
    this._cancelOrders();
  }
}
