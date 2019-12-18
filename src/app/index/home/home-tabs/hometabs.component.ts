<<<<<<< HEAD
import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
=======
import { Component, OnInit, OnDestroy, ElementRef, Inject } from '@angular/core';
>>>>>>> development
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Filter } from '@app/_models/filter/filter';
<<<<<<< HEAD
=======
import { Notyf } from 'notyf';
import { NOTYF } from '@app/_helpers/notyf.token';
>>>>>>> development

@Component({
  selector: 'home-tabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss']
})
export class HometabsComponent implements OnInit, OnDestroy{
<<<<<<< HEAD
=======

  mode = 'indeterminate';
>>>>>>> development
  limit = 4;
  products: any;
  btnclass = 'button add_to_cart_button';
  label = 'Add To cart';
  apiUrl = `${environment.apiUrl}`;
  filter: Filter;
<<<<<<< HEAD
  carouhtml: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private elementRef: ElementRef,
=======
  loadingProduct = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
>>>>>>> development
    private productService: ProductService,
    private alertService: AlertService
    ) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getProducts('featured');
<<<<<<< HEAD
    this.iniSlickJs();
  }

  private iniSlickJs() {
    const htmlScriptElement = document.createElement('script');
    htmlScriptElement.src = 'https://unpkg.com/slick-carousel@1.8.1/slick/slick.js';
    this.elementRef.nativeElement.appendChild(htmlScriptElement);
  }

  getProducts(option: string) {
    console.log(option);
=======
  }


  getProducts(option: string) {
    this.limit = 4;
    this.loadingProduct = true;
>>>>>>> development
    this.productService.getProductOption(option).pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.products = datas.data;
        if(this.products.length > 0){
          setTimeout(() => {
            this.loadingProduct = false;
          }, 500);
        }else{
          this.loadingProduct = false;
        }
    },error => {
        this.alertService.error(error, true);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  show(limit: number){
    this.limit = limit;
  }
}
