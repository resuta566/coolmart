import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { OrderService } from '@app/_service/order/order.service';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  apiUrl = `${environment.apiUrl}`;
  orderId: number;
  orderData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param => {
      console.log(param.get('transactionId'));
      this.orderId = +param.get('transactionId');
      this.orderService.oneOrder(this.orderId).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.orderData = data;
        console.log(this.orderData);

      });

    });
  }

  ngOnInit() {
    const stringe = 'James Lester -- Tunasan';
    const spliter = stringe.split('--');
    console.log(spliter);

  }
  ngOnDestroy(): void {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  cancelItem(cartId: number) {
    const url = this.router.routerState.snapshot.url;
    this.router.navigate(['/dashboard/order/cancel-order/', cartId], {queryParams: {returnUrl: url.toString()}});
  }
  returnItem(cartId: number) {
    const url = this.router.routerState.snapshot.url;
    this.router.navigate(['/dashboard/order/return-order/', cartId], {queryParams: {returnUrl: url.toString()}});
  }
}
