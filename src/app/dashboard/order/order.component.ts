import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '@app/_service/order/order.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  mode = 'indeterminate';
  value = 20;
  apiUrl = `${environment.apiUrl}`;
  imageUrl = 'assets/images/noimage2.jpg';
  orders: Array<any> = [];
  orderPage: any;
  orderChangePage = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  orderMeta: any;
  loadingOrder = false;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrder();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  getOrder() {
    this.loadingOrder = true;
    this.orderService.orders(this.orderChangePage).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.orders = data.data;
      console.log(this.orders);
      this.orderPage = data.links;
      this.orderMeta = data.meta;
      setTimeout(() => {
        this.loadingOrder = false;
      }, 1000);
    });
  }

  changePageOrder(page: string) {
    this.orderChangePage = page;
    this.getOrder();
  }
}
