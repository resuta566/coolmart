import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { environment } from '@environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '@app/_service/brand.service';
import { DOCUMENT } from '@angular/common';
import { CategoriesService } from '@app/_service/categories.service';
import { TypesService } from '@app/_service/types.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  btnclass="button add_to_cart_button addToCartBtn";
  label = "Add to cart";
  products: Object;
  imgThumb: string;
  img: string;
  apiImgUrl = `${environment.apiUrl}`;
  brands: any;
  categories: any;
  types: any;
  limit = 4;
  limitCat = 4;
  limitType = 4;
  keyword: string;
  optKeyword = "";
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private productService: ProductService,
    private router: Router,
    private brandService: BrandService,
    private categoriesService: CategoriesService,
    private typeService: TypesService,
    private titleService: Title,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(rt => {
      this.keyword = rt.get('search');
      this.getProducts(this.keyword);
      if(this.keyword == null){
        this.titleService.setTitle(  `Buy at Best Pirce | Cool Mart` );
      }else{
      this.titleService.setTitle(  `${this.keyword} - Buy ${this.keyword} at Best Pirce | Cool Mart` );
      }
    });
    this.document.body.classList.remove('page-template-default');
    this.document.body.classList.add('left-sidebar');
    this.getBrands();
    this.getCategories();
    this.getTypes();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  getProducts(keyword?) {
    let actualKeyword = keyword ? keyword : this.optKeyword;
    this.productService.getProducts(actualKeyword).pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
      this.products = datas.data;
      },
        error => {
        console.log(error);
    });
  }

  getBrands() {
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((brands: any)=>{
      this.brands = brands.data;
    })
  }

  getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((categories: any)=>{
      this.categories = categories.data;
    })
  }

  getTypes() {
    this.typeService.getTypes().pipe(takeUntil(this.destroy$)).subscribe((types: any)=>{
      this.types = types.data;
    })
  }

  addToCart(){
    this.router.navigate(['/cart']);
  }

  showMore(limit: number){
    // console.log(limit);
    this.limit = limit;
  }
  showLess(){
    this.limit = 4;
  }
  showMoreCat(limit: number){
    // console.log(limit);
    this.limitCat = limit;
  }
  showLessCat(){
    this.limitCat = 4;
  }
  showMoreType(limit: number){
    // console.log(limit);
    this.limitType = limit;
  }
  showLessType(){
    this.limitType = 4;
  }
}
