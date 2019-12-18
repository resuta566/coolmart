<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CancelService } from '@app/_service/order/cancel/cancel.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@environments/environment';
>>>>>>> development

@Component({
  selector: 'app-cancellations',
  templateUrl: './cancellations.component.html',
  styleUrls: ['./cancellations.component.scss']
})
<<<<<<< HEAD
export class CancellationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

=======
export class CancellationsComponent implements OnInit, OnDestroy {

  apiUrl = `${environment.apiUrl}`;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  cancelOrders: any;
  cancelChangePage = '';
  constructor(
    private cancellService: CancelService
  ) { }

  ngOnInit() {
    this._cancelOrders();
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  _cancelOrders(){
    this.cancellService.cancelOrders(this.cancelChangePage).pipe(takeUntil(this.destroy$)).subscribe(orders=>{
      this.cancelOrders = orders;
    });
  }

  changePageCancellOrder(page: string){
    this.cancelChangePage = page;
    this._cancelOrders();
  }
>>>>>>> development
}
