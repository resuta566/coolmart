import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductSectionService } from '@app/_service/product/product-section/product-section.service';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home-product-section',
  templateUrl: './home-product-section.component.html',
  styleUrls: ['./home-product-section.component.scss']
})
export class HomeProductSectionComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  loading = true;
  apiUrl = `${environment.apiUrl}`;
  brandProduct: any;
  constructor(
    private productSecService: ProductSectionService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sponsoredProducts();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sponsoredProducts() {
    this.productSecService.sponsoredProducts().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.brandProduct = data;
      if (this.brandProduct) {
        this.loading = false;
        if (this.brandProduct.data.relationships.items.data.length > 0) {
          this.loading = false;
        }
      }
      console.log('brandProduct', this.brandProduct);
    });
  }
}
