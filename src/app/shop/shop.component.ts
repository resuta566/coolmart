import { Component, OnInit, Inject, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '@app/_service/brand/brand.service';
import { DOCUMENT } from '@angular/common';
import { CategoriesService } from '@app/_service/category/categories.service';
import { TypesService } from '@app/_service/type/types.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AlertService } from '@app/_service';

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
  products: Object[];
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
    private route: ActivatedRoute,
    private alertService: AlertService
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
    this.document.body.classList.remove('page-template-default'); //For the style of this component
    this.document.body.classList.add('left-sidebar'); //important for the style of the shop
    this.getBrands();
    this.getCategories();
    this.getTypes();
  }
  ngOnDestroy(): void {
    this.document.body.classList.add('page-template-default'); //For the styles of other component
    this.destroy$.next(true); //For Memory Leaks same below
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
                  this.alertService.error(error, true);
              });
  }

  filter(){
    //this will filter what the user check
    this.getProducts(this.keyword, this.brandArray, this.categoryArray, this.typeArray, this.mini, this.maxi);
  }

  getBrands() {
    //Get the Brands
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((brands: any)=>{
      this.brands = brands.data;
    });
  }

  getCategories() {
    //Get the Categories
    this.categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((categories: any)=>{
      this.categories = categories.data;
    });
  }

  getTypes() {
    //Get the Types
    this.typeService.getTypes().pipe(takeUntil(this.destroy$)).subscribe((types: any)=>{
      this.types = types.data;
    });
  }

  showMore(limit: number){
    //Show more list of brands
    this.limit = limit;
  }
  showLess(){
    //Show less list of brands
    this.limit = 4;
  }
  showMoreCat(limit: number){
    //Show more list of categories
    this.limitCat = limit;
  }
  showLessCat(){
    //Show less list of categories
    this.limitCat = 4;
  }
  showMoreType(limit: number){
    //Show more list of types
    this.limitType = limit;
  }
  showLessType(){
    //Show less list of types
    this.limitType = 4;
  }

  getBrandId(id: any, isChecked: boolean){
    //Add the Brand ID to the array to send to the API else remove ID from the array
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
    //Add the Category ID to the array to send to the API else remove ID from the array
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
    //Add the Type ID to the array to send to the API else remove ID from the array
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
      //Reset All Filter
      if(this.keyword == null){
        window.location.reload();
      }else{
        window.location.reload();
        this.getProducts(this.keyword);
      }
    }else if(option == 'brands'){
      //Reset Brand Filter Only
      this.brandscbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.brandArray.splice(0,this.brandArray.length);
      this.filter();
    }else if(option == 'categories'){
      //Reset Category Filter Only
      this.categorycbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.categoryArray.splice(0,this.categoryArray.length);
      this.filter();
    }else if(option == 'types'){
      //Reset Type Filter Only
      this.typecbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.typeArray.splice(0,this.typeArray.length);
      this.filter();
    }
  }

  pricerange(){
    //Submit the Price Range
    this.filter();
  }

  priceClear(){
    //Clear the Price Range
    this.mini = 0;
    this.maxi = 0;
    this.pricerange();
  }
}
