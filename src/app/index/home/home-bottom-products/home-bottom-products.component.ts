import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { Filter } from '@app/_models/filter/filter';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'home-bottom-products',
  templateUrl: './home-bottom-products.component.html',
  styleUrls: ['./home-bottom-products.component.scss']
})
export class HomeBottomProductsComponent implements OnInit, OnDestroy {

  mode = 'indeterminate';
  limit = 4;
  productsFeatured: any;
  productsOnSale: any;
  productsTop: any;
  btnclass = 'button add_to_cart_button';
  label = 'Add To cart';
  apiUrl = `${environment.apiUrl}`;
  filter: Filter;
  loadingProduct = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private productService: ProductService) { }

  ngOnInit() {
    this.getFeatured();
    this.getDiscounted();
    this.getTopRated();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getFeatured() {
    this.loadingProduct = true;
    this.productService.getProductOption('featured').pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.productsFeatured = datas.data;
      // console.log(datas);

      if (this.productsFeatured.length > 0) {
          setTimeout(() => {
            this.loadingProduct = false;
          }, 500);
        } else {
          this.loadingProduct = false;
          // this.notyf.error(`There seems to be no featured product at this moment.`);
        }
    }, error => {
      // this.notyf.error(`There seems to be no ${option} product at this moment.`);
      console.log(error);
    });
  }
  getDiscounted() {
    this.loadingProduct = true;
    this.productService.getProductOption('discounted').pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.productsOnSale = datas.data;
      if (this.productsOnSale.length > 0) {
          setTimeout(() => {
            this.loadingProduct = false;
          }, 500);
        } else {
          this.loadingProduct = false;
          // this.notyf.error(`There seems to be no On Sale product at this moment.`);
        }
    }, error => {
      // this.notyf.error(`There seems to be no ${option} product at this moment.`);
      console.log(error);
    });
  }
  getTopRated() {
    this.loadingProduct = true;
    this.productService.getProductOption('top-rated').pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.productsTop = datas.data;
      if (this.productsTop.length > 0) {
          setTimeout(() => {
            this.loadingProduct = false;
          }, 500);
        } else {
          this.loadingProduct = false;
          // this.notyf.error(`There seems to be no Top Rated product at this moment.`);
        }
    }, error => {
      // this.notyf.error(`There seems to be no ${option} product at this moment.`);
      console.log(error);
    });
  }
}
