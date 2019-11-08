import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home-tabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss']
})
export class HometabsComponent implements OnInit, OnDestroy{
  products: Object;
  btnclass = 'button add_to_cart_button';
  label = 'Add To cart';
  apiUrl = `${environment.apiUrl}`;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private productService: ProductService,
    private alertService: AlertService
    ) { }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.products = datas.data;
      },
        error => {
        this.alertService.error(error, true);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
