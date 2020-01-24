import { Component, OnInit, OnDestroy, ElementRef, Inject } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Filter } from '@app/_models/filter/filter';
import { Notyf } from 'notyf';
import { NOTYF } from '@app/_helpers/notyf.token';

@Component({
  selector: 'home-tabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss']
})
export class HometabsComponent implements OnInit, OnDestroy {

  mode = 'indeterminate';
  limit = 4;
  products: any;
  btnclass = 'button add_to_cart_button';
  label = 'Add To cart';
  apiUrl = `${environment.apiUrl}`;
  filter: Filter;
  loadingProduct = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private productService: ProductService,
    private alertService: AlertService
    ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getProducts('featured');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getProducts(option: string) {
    this.limit = 4;
    this.loadingProduct = true;
    this.productService.getProductOption(option).pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.products = datas.data;
      if (this.products.length > 0) {
          setTimeout(() => {
            this.loadingProduct = false;
          }, 500);
        } else {
          this.loadingProduct = false;
        }
    }, error => {
        this.alertService.error(error, true);
    });
  }

  show(limit: number) {
    this.limit = limit;
  }
}
