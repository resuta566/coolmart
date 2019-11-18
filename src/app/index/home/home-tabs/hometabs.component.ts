import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Filter } from '@app/_models/filter/filter';

@Component({
  selector: 'home-tabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss']
})
export class HometabsComponent implements OnInit, OnDestroy{
  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  products: any;
  btnclass = 'button add_to_cart_button';
  label = 'Add To cart';
  apiUrl = `${environment.apiUrl}`;
  filter: Filter;
  carouhtml: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private elementRef: ElementRef,
    private productService: ProductService,
    private alertService: AlertService
    ) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getProducts('featured');
    this.iniSlickJs();
  }

  private iniSlickJs() {
    const htmlScriptElement = document.createElement('script');
    htmlScriptElement.src = 'https://unpkg.com/slick-carousel@1.8.1/slick/slick.js';
    this.elementRef.nativeElement.appendChild(htmlScriptElement);
  }

  getProducts(option: string) {
    this.productService.getProductOption(option).pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
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
