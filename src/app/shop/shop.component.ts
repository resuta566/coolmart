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
import { Filter } from '@app/_models/filter/filter';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
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
  loadingProduct = false;
  loadingBrand = false;
  loadingCat = false;
  loadingType = false;
  color = 'warn';
  mode = 'indeterminate';
  value = 20;
  btnclass="button add_to_cart_button addToCartBtn";
  label = "Add to cart";
  apiImgUrl = `${environment.apiUrl}`;
  products: Object[];
  page: any;
  link: any;
  brands: any;
  categories: any;
  types: any;
  limit = 4;//Brand Filter limit
  limitCat = 4;//Category Filter limit
  limitType = 4;//Type Filter limit
  keyword: string;
  mini: number;
  maxi: number;
  brandArray: Array<any> = [];//Brand Filter Array
  categoryArray: Array<any> = [];//Category Filter Array
  typeArray: Array<any> = []; //Type Filter Array
  sortby: string;// The value to throw to the service
  sortOptions =[
    {id: 1,name: 'Price low to high', value: 'asc'},
    {id: 2, name: 'Price high to low', value: 'desc'}
  ]; //Dropdown Values
  sortSelect = this.sortOptions[0].value; //Initialize to have default value in the dropdown
  currentPage: string;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
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
      this.loadingProduct = true;
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


  getProducts(keyword?: string, brand?: Array<any>, category?: Array<any>, type?: Array<any>, min?:number, max?:number, sortBy?: string, page?: string) {
    //Calling the getProducts service from the api
    let filterArray: Filter = {
      name: keyword,
      brandArray: brand,
      categoryArray: category,
      typeArray: type,
      min: min,
      max: max,
      sort: sortBy,
      page:page
    }; //Filter Options
    this.loadingProduct = true;
    this.productService.getProducts(filterArray)
          .pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
                this.products = datas.data;
                this.page = datas.meta;
                this.link = datas.links;
                this.loadingProduct = false;
                },
                  error => {
                    this.notyf.error(error);
              })
              ;
  }

  filter(){
    //this will filter what are the options
    this.getProducts(this.keyword, this.brandArray, this.categoryArray, this.typeArray, this.mini, this.maxi, this.sortby, this.currentPage);
  }

  getBrands() {
    //Get the Brands
    this.loadingBrand = true;
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((brands: any)=>{
      this.brands = brands.data;
      this.loadingBrand = false;
    });
  }

  getCategories() {
    //Get the Categories
    this.loadingCat = true;
    this.categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((categories: any)=>{
      this.categories = categories.data;
      this.loadingCat = false;
    });
  }

  getTypes() {
    //Get the Types
      this.loadingType = true;
    this.typeService.getTypes().pipe(takeUntil(this.destroy$)).subscribe((types: any)=>{
      this.types = types.data;
      this.loadingType = false;
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
      this.currentPage = null;
      this.filter();
    }else {
      let index = this.brandArray.indexOf(id);
      this.brandArray.splice(index,1);
      this.currentPage = null;
      this.filter();
    }
  }
  getCategoryId(id: number, isChecked: boolean){
    //Add the Category ID to the array to send to the API else remove ID from the array
    if(isChecked){
      this.categoryArray.push(id);
      this.currentPage = null;
      this.filter();
    }else{
      let index = this.categoryArray.indexOf(id);
      this.categoryArray.splice(index,1);
      this.currentPage = null;
      this.filter();
    }
  }

  getTypeId(id: number, isChecked: boolean){
    //Add the Type ID to the array to send to the API else remove ID from the array
    if(isChecked){
      this.typeArray.push(id);
      this.currentPage = null;
      this.filter();
    }else{
      let index = this.typeArray.indexOf(id);
      this.typeArray.splice(index, 1);
      this.currentPage = null;
      this.filter();
    }
  }

  sort(){
    //sortSelect throws value either asc or desc
    this.sortby = this.sortSelect;
    this.currentPage = null;
    this.filter();
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
      this.currentPage = null;
      this.filter();
    }else if(option == 'categories'){
      //Reset Category Filter Only
      this.categorycbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.categoryArray.splice(0,this.categoryArray.length);
      this.currentPage = null;
      this.filter();
    }else if(option == 'types'){
      //Reset Type Filter Only
      this.typecbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.typeArray.splice(0,this.typeArray.length);
      this.currentPage = null;
      this.filter();
    }
  }

  pricerange(){
    //Submit the Price Range
    this.currentPage = null;
    this.filter();
  }

  priceClear(){
    //Clear the Price Range
    this.currentPage = null;
    this.mini = 0;
    this.maxi = 0;
    this.pricerange();
  }

  changePage(pageUrl: string){
    this.currentPage = pageUrl;
    this.filter();
  }
}