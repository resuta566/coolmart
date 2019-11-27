import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '@app/_service/order/order.service';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Array<any> = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrder();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();

  }

  getOrder(){
    this.orderService.orders().pipe(first(), takeUntil(this.destroy$)).subscribe((data: any)=>{
      this.orders = data.data;
    });
  }
}
