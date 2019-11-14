import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_service/core/alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Filter } from '@app/_models/filter/filter';

@Component({
  selector: 'home-products-card',
  templateUrl: './home-products-card.component.html',
  styleUrls: ['./home-products-card.component.scss']
})
export class HomeProductsCardComponent implements OnInit, OnDestroy {

  filter: Filter;
  products: Object;
  apiUrl = `${environment.apiUrl}`;
  imgArray = [];
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
        this.alertService.error(error);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
