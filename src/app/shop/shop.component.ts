import { Component, OnInit, Inject, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
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

  @ViewChildren("brandscbox") brandscbox: QueryList<ElementRef>;
  @ViewChildren("categorycbox") categorycbox: QueryList<ElementRef>;
  @ViewChildren("typecbox") typecbox: QueryList<ElementRef>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  btnclass="button add_to_cart_button addToCartBtn";
  label = "Add to cart";
  products: Object;
  page: any;
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
  min = 0;
  max = 0;
  mini: number;
  maxi: number;
  brandArray: Array<any> = [];
  categoryArray: Array<any> = [];
  typeArray: Array<any> = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private productService: ProductService,
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
        this.titleService.setTitle(  `Buy at Best Price | Cool Mart` );
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


  getProducts(keyword?, brand?, category?, type?, min?, max?) {
    //Calling the getProducts service from the api
    this.productService.getProducts(keyword, brand, category, type, min, max)
          .pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
                this.products = datas.data;
                this.page = datas.meta;
                },
                  error => {
                  console.log(error);
              });
  }

  filter(){
    //this will filter what the user check
    this.getProducts(this.keyword, this.brandArray, this.categoryArray, this.typeArray, this.mini, this.maxi);
  }

  getBrands() {
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((brands: any)=>{
      this.brands = brands.data;
    });
  }

  getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((categories: any)=>{
      this.categories = categories.data;
    });
  }

  getTypes() {
    this.typeService.getTypes().pipe(takeUntil(this.destroy$)).subscribe((types: any)=>{
      this.types = types.data;
    });
  }

  showMore(limit: number){
    this.limit = limit;
  }
  showLess(){
    this.limit = 4;
  }
  showMoreCat(limit: number){
    this.limitCat = limit;
  }
  showLessCat(){
    this.limitCat = 4;
  }
  showMoreType(limit: number){
    this.limitType = limit;
  }
  showLessType(){
    this.limitType = 4;
  }

  getBrandId(id: any, isChecked: boolean){
    if(isChecked){
      this.brandArray.push(id);
      this.filter();
    }else {
      let index = this.brandArray.indexOf(id);
      this.brandArray.splice(index,1);
      this.filter();
    }
  }
  getCategoryId(id: number, isChecked: boolean){
    if(isChecked){
      this.categoryArray.push(id);
      this.filter();
    }else{
      let index = this.categoryArray.indexOf(id);
      this.categoryArray.splice(index,1);
      this.filter();
    }
  }

  getTypeId(id: number, isChecked: boolean){
    if(isChecked){
      this.typeArray.push(id);
      this.filter();
    }else{
      let index = this.typeArray.indexOf(id);
      this.typeArray.splice(index, 1);
      this.filter();
    }
  }

  reset(option: string){
    if(option == 'all'){
      if(this.keyword == null){
        window.location.reload();
      }else{
        window.location.reload();
        this.getProducts(this.keyword);
      }
    }else if(option == 'brands'){
      this.brandscbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.brandArray.splice(0,this.brandArray.length);
      this.filter();
    }else if(option == 'categories'){
      this.categorycbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.categoryArray.splice(0,this.categoryArray.length);
      this.filter();
    }else if(option == 'types'){
      this.typecbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.typeArray.splice(0,this.typeArray.length);
      this.filter();
    }
  }

  pricerange(){
    this.filter();
  }

  priceClear(){
    this.mini = 0;
    this.maxi = 0;
    this.pricerange();
  }
}
