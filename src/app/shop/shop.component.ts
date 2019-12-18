import { Component, OnInit, Inject, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '@app/_service/brand/brand.service';
import { DOCUMENT } from '@angular/common';
import { CategoriesService } from '@app/_service/category/categories.service';
import { TypesService } from '@app/_service/type/types.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Filter } from '@app/_models/filter/filter';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

<<<<<<< HEAD

=======
  aTag = 'false';
>>>>>>> development
  @ViewChildren("brandscbox") brandscbox: QueryList<ElementRef>;
  @ViewChildren("categorycbox") categorycbox: QueryList<ElementRef>;
  @ViewChildren("typecbox") typecbox: QueryList<ElementRef>;
  @ViewChildren("hpcaps") hpcaps: QueryList<ElementRef>;
<<<<<<< HEAD
  private destroy$: Subject<boolean> = new Subject<boolean>();
=======
  @ViewChildren("trcaps") trcaps: QueryList<ElementRef>;
  //These Are for the Checkbox list
  private destroy$: Subject<boolean> = new Subject<boolean>(); //Destroy Subscription to avoid memory leaks

>>>>>>> development
  loadingProduct = false;
  loadingBrand = false;
  loadingCat = false;
  loadingType = false;
<<<<<<< HEAD
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
  limit = 4;//Brand Array Filter limit
  limitCap = 4;//Capacity / HP Array Filter limit
  limitCat = 4;//Category Array Filter limit
  limitType = 4;//Type Array Filter limit
  keyword: string;
  mini: number;
  maxi: number;
=======
  //Loading animation
  color = 'warn';
  mode = 'indeterminate';
  value = 20;
  //MatSpinner Values
  btnclass = "button add_to_cart_button addToCartBtn";
  label = "Add to cart";
  //Add To Cart Component class and Label
  apiImgUrl = `${environment.apiUrl}`;
  products: Object[];
  page: any; //Meta Link
  link: any; //Pagination
  brands: any;
  categories: any;
  types: any;
  //Lists
  limit = 4;//Brand Array Filter limit
  limitCapHP = 4;//Capacity / HP Array Filter limit
  limitCapTR = 4;//Capacity / HP Array Filter limit
  limitCat = 4;//Category Array Filter limit
  limitType = 4;//Type Array Filter limit
  keyword: string; //Search Query
  mini: number; //The Minimum Filter
  maxi: number; //Maximum Filter
>>>>>>> development
  brandArray: Array<any> = [];//Brand Filter Array
  categoryArray: Array<any> = [];//Category Filter Array
  typeArray: Array<any> = []; //Type Filter Array
  sortby: string;// The value to throw to the service
<<<<<<< HEAD
  sortOptions =[
    {id: 1,name: 'Price low to high', value: 'asc'},
    {id: 2, name: 'Price high to low', value: 'desc'}
  ]; //Dropdown Values
  airconphp = [
    {hp: 0.5},
    {hp: 1.0},
    {hp: 1.5},
    {hp: 2.0},
    {hp: 2.5},
    {hp: 3.0}
  ]; //Aircon HorsePower
  airconhpselectedArray: Array<any> = []; //The Selected Aircon HP
=======
  sortOptions = [
    { id: 1, name: 'Price low to high', value: 'asc' },
    { id: 2, name: 'Price high to low', value: 'desc' }
  ]; //Dropdown Values
  airconphp = [
    { hp: 0.5 },
    { hp: 1.0 },
    { hp: 1.5 },
    { hp: 2.0 },
    { hp: 2.5 },
    { hp: 3.0 }
  ]; //Aircon HorsePower
  airconptr = [
    { tr: 1 },
    { tr: 2 },
    { tr: 3 },
    { tr: 4 },
    { tr: 5 }
  ]; //Aircon HorsePower
  airconhpselectedArray: Array<any> = []; //The Selected Aircon HP
  aircontrselectedArray: Array<any> = []; //The Selected Aircon TR
>>>>>>> development
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
    private route: ActivatedRoute,
    private router: Router
<<<<<<< HEAD
    ) {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(rt => {
      this.keyword = rt.get('search');
=======
  ) {
    // this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(rt => {
    //   this.keyword = rt.get('search');
    //   this.loadingProduct = true;
    //   this.getProducts(this.keyword);
    //   if (this.keyword == null) {
    //     this.titleService.setTitle(`Buy at Best Price | Cool Mart`);
    //   } else {
    //     this.titleService.setTitle(`${this.keyword} - Buy ${this.keyword} at Best Pirce | Cool Mart`);
    //   }
    // });
    this.route.queryParams.pipe().subscribe(qp=>{
      this.keyword = qp.q;
>>>>>>> development
      this.loadingProduct = true;
      this.getProducts(this.keyword);
      if (this.keyword == null) {
        this.titleService.setTitle(`Buy at Best Price | Cool Mart`);
      } else {
        this.titleService.setTitle(`${this.keyword} - Buy ${this.keyword} at Best Pirce | Cool Mart`);
      }
    });
<<<<<<< HEAD
    }

  ngOnInit() {
=======
  }

  ngOnInit() {
    this.aTag = 'false';
>>>>>>> development
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


  getProducts(keyword?: string, brand?: Array<any>, category?: Array<any>,
<<<<<<< HEAD
              type?: Array<any>, min?:number, max?:number, sortBy?: string,
              page?: string, cap?: Array<any>
              ) {
=======
    type?: Array<any>, min?: number, max?: number, sortBy?: string,
    page?: string, hp?: Array<any>, tr?: Array<any>
  ) {
>>>>>>> development
    //Calling the getProducts service from the api
    let filterArray: Filter = {
      name: keyword,
      brandArray: brand,
      categoryArray: category,
      typeArray: type,
      min: min,
      max: max,
      sort: sortBy,
      page: page,
<<<<<<< HEAD
      cap: cap
    }; //Filter Options

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

  search(keyword: string) {
    let value = keyword;
    this.router.navigate([`/shop/${value}`]);
  }

  filter(){
    //this will filter what are the options
    this.getProducts(this.keyword, this.brandArray, this.categoryArray, this.typeArray, this.mini, this.maxi, this.sortby, this.currentPage, this.airconhpselectedArray);
=======
      hp: hp,
      tr: tr
    }; //Filter Options

    this.productService.getProducts(filterArray)
      .pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
        this.products = datas.data;
        this.page = datas.meta;
        this.link = datas.links;
        this.loadingProduct = false;
        // console.log(this.products ,'all products');

      },
        error => {
          this.notyf.error(error);
        })
      ;
  }

  search(keyword: string) {
    this.keyword = keyword;
    this.router.navigate([`/shop`],{ queryParams: { q: this.keyword } });
  }

  filter() {
    //this will filter what are the options
    this.getProducts(this.keyword, this.brandArray,
      this.categoryArray, this.typeArray, this.mini,
      this.maxi, this.sortby, this.currentPage,
      this.airconhpselectedArray, this.aircontrselectedArray);
>>>>>>> development
  }

  getBrands() {
    //Get the Brands
    this.loadingBrand = true;
<<<<<<< HEAD
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((brands: any)=>{
=======
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((brands: any) => {
>>>>>>> development
      this.brands = brands.data;
      this.loadingBrand = false;
    });
  }

  getCategories() {
    //Get the Categories
    this.loadingCat = true;
<<<<<<< HEAD
    this.categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((categories: any)=>{
=======
    this.categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((categories: any) => {
>>>>>>> development
      this.categories = categories.data;
      this.loadingCat = false;
    });
  }

  getTypes() {
    //Get the Types
<<<<<<< HEAD
      this.loadingType = true;
    this.typeService.getTypes().pipe(takeUntil(this.destroy$)).subscribe((types: any)=>{
=======
    this.loadingType = true;
    this.typeService.getTypes().pipe(takeUntil(this.destroy$)).subscribe((types: any) => {
>>>>>>> development
      this.types = types.data;
      this.loadingType = false;
    });
  }

<<<<<<< HEAD
  showMore(limit: number){
    //Show more/less list of brands
    this.limit = limit;
  }
  showMoreCat(limit: number){
    //Show more list of categories
    this.limitCat = limit;
  }
  showCap(limit: number){
    //Show more list of capacity
    this.limitCap = limit;
=======
  showMore(limit: number) {
    //Show more/less list of brands
    this.limit = limit;
  }
  showMoreCat(limit: number) {
    //Show more list of categories
    this.limitCat = limit;
  }
  showCapHP(limit: number) {
    //Show more list of capacity HP
    this.limitCapHP = limit;
>>>>>>> development
  }
  showCapTR(limit: number) {
    //Show more list of capacity TR
    this.limitCapTR = limit;
  }
  showMoreType(limit: number) {
    //Show more list of types
    this.limitType = limit;
  }

  getBrandId(id: any, isChecked: boolean) {
    console.log(id, isChecked);

    //Add the Brand ID to the array to send to the API else remove ID from the array
    if (isChecked) {
      this.brandArray.push(id);
      this.currentPage = null;
      this.filter();
    } else {
      let index = this.brandArray.indexOf(id);
<<<<<<< HEAD
      this.brandArray.splice(index,1);
=======
      this.brandArray.splice(index, 1);
>>>>>>> development
      this.currentPage = null;
      this.filter();
    }
  }
<<<<<<< HEAD
  getHpCap(hp: any, isChecked: boolean){
    //Add the HP to the array to send to the API else remove HP from the array
    if(isChecked){
      this.airconhpselectedArray.push(hp);
      this.currentPage = null;
      this.filter();
    }else {
      let index = this.airconhpselectedArray.indexOf(hp);
      this.airconhpselectedArray.splice(index,1);
=======
  getHpCap(hp: any, isChecked: boolean) {
    //Add the HP to the array to send to the API else remove HP from the array
    if (isChecked) {
      this.airconhpselectedArray.push(hp);
      this.currentPage = null;
      this.filter();
    } else {
      let index = this.airconhpselectedArray.indexOf(hp);
      this.airconhpselectedArray.splice(index, 1);
      this.currentPage = null;
      this.filter();
    }
  }
  getTrCap(tr: any, isChecked: boolean) {
    //Add the TR to the array to send to the API else remove HP from the array
    if (isChecked) {
      this.aircontrselectedArray.push(tr);
      this.currentPage = null;
      this.filter();
    } else {
      let index = this.aircontrselectedArray.indexOf(tr);
      this.aircontrselectedArray.splice(index, 1);
>>>>>>> development
      this.currentPage = null;
      this.filter();
    }
  }
  getCategoryId(id: number, isChecked: boolean) {
    //Add the Category ID to the array to send to the API else remove ID from the array
    if (isChecked) {
      this.categoryArray.push(id);
      this.currentPage = null;
      this.filter();
    } else {
      let index = this.categoryArray.indexOf(id);
<<<<<<< HEAD
      this.categoryArray.splice(index,1);
=======
      this.categoryArray.splice(index, 1);
>>>>>>> development
      this.currentPage = null;
      this.filter();
    }
  }

  getTypeId(id: number, isChecked: boolean) {
    //Add the Type ID to the array to send to the API else remove ID from the array
    if (isChecked) {
      this.typeArray.push(id);
      this.currentPage = null;
      this.filter();
    } else {
      let index = this.typeArray.indexOf(id);
      this.typeArray.splice(index, 1);
      this.currentPage = null;
      this.filter();
    }
  }

<<<<<<< HEAD
  sort(){
=======
  sort() {
>>>>>>> development
    //sortSelect throws value either asc or desc
    this.sortby = this.sortSelect;
    this.currentPage = null;
    this.filter();
  }

<<<<<<< HEAD
  reset(option: string){
    if(option == 'all'){
=======
  reset(option: string) {
    if (option == 'all') {
>>>>>>> development
      //Reset All Filter
      if (this.keyword == null) {
        window.location.reload();
      } else {
        window.location.reload();
        this.getProducts(this.keyword);
      }
    } else if (option == 'brands') {
      //Reset Brand Filter Only
      this.brandscbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
<<<<<<< HEAD
      this.brandArray.splice(0,this.brandArray.length);
=======
      this.brandArray.splice(0, this.brandArray.length);
>>>>>>> development
      this.currentPage = null;
      this.filter();
    } else if (option == 'categories') {
      //Reset Category Filter Only
      this.categorycbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
<<<<<<< HEAD
      this.categoryArray.splice(0,this.categoryArray.length);
=======
      this.categoryArray.splice(0, this.categoryArray.length);
>>>>>>> development
      this.currentPage = null;
      this.filter();
    } else if (option == 'types') {
      //Reset Type Filter Only
      this.typecbox.forEach((element) => {
        element.nativeElement.checked = false;
      });
<<<<<<< HEAD
      this.typeArray.splice(0,this.typeArray.length);
      this.currentPage = null;
      this.filter();
    }else if(option == 'cap'){
=======
      this.typeArray.splice(0, this.typeArray.length);
      this.currentPage = null;
      this.filter();
    } else if (option == 'hp') {
>>>>>>> development
      //Reset Type Filter Only
      this.hpcaps.forEach((element) => {
        element.nativeElement.checked = false;
      });
<<<<<<< HEAD
      this.airconhpselectedArray.splice(0,this.airconhpselectedArray.length);
=======
      this.airconhpselectedArray.splice(0, this.airconhpselectedArray.length);
      this.currentPage = null;
      this.filter();
    }else if (option == 'tr') {
      //Reset Type Filter Only
      this.trcaps.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.aircontrselectedArray.splice(0, this.aircontrselectedArray.length);
>>>>>>> development
      this.currentPage = null;
      this.filter();
    }
  }

  pricerange() {
    //Submit the Price Range
    this.currentPage = null;
    this.filter();
  }

  priceClear() {
    //Clear the Price Range
    this.currentPage = null;
    this.mini = 0;
    this.maxi = 0;
    this.pricerange();
  }

<<<<<<< HEAD
  changePage(pageUrl: string){
=======
  changePage(pageUrl: string) {
>>>>>>> development
    this.currentPage = pageUrl;
    this.filter();
  }
}
