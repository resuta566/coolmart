import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Title } from '@angular/platform-browser';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Filter } from '@app/_models/filter/filter';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart-item-update',
  templateUrl: './cart-item-update.component.html',
  styleUrls: ['./cart-item-update.component.scss']
})
export class CartItemUpdateComponent implements OnInit, OnDestroy {

  @ViewChild('customFeets', { static: true }) customFeets: ElementRef;
  private destroy$: Subject<boolean> = new Subject<boolean>(); // Destroy Subscription to avoid memory leaks
  loading = false;
  redirectToCart = true;
  apiUrl = `${environment.apiUrl}`;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imgArray = [];
  img: string;
  slug: string;
  response: any;
  products: any;
  reviews: any;
  reviewPage = '';
  reviewMeta: any;
  reviewLinks: any;
  btndisabled = false;
  btndisabledminus = false;
  btnaddtocart = false;
  btnclass = 'single_add_to_cart_button button';
  relatedProductsbtnclass = 'button add_to_cart_button';
  label = 'Update Cart';
  itemQty = 1;
  relatedFilter: Filter;
  relatedBrandArray: Array<any>;
  relatedCategoryArray: Array<any>;
  relatedTypeArray: Array<any>;
  customFeet = true;
  thefeet = 0;
  feetPrice = 0;
  feetmsg = '';
  btndecreaseFeet = true;
  btnincreaseFeet = false;
  standard_installation_fee = 0;
  optionValue: number;
  service_name = '';
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private route: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title,
    ) {
      this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(qp => {
        if (qp.configupdate == 'updateCart') {
          this.label = 'Update Cart';
        }
      });
      this.response = this.route.snapshot.data['data'];
      this.relatedBrandArray = [ this.response.item.attributes.brand_id ];
      this.relatedCategoryArray = [ this.response.item.attributes.category_id ];
      this.relatedTypeArray = [ this.response.item.attributes.type_id  ];
      this.standard_installation_fee = +this.response.attributes.services.item_standard_installation_fee;
      this.itemQty = this.response.attributes.cart_qty;
      this.optionValue = +this.response.attributes.services.total_feet;
    }

  ngOnInit() {
    this.getProductDetails();
    this.thePrice();
    if (this.optionValue > 10) {
      this.customMeasurement('custom');
    } else if (+this.optionValue === 10) {
      this.customMeasurement('default');
    } else {
      this.customMeasurement('nothing');
    }
    // this.customMeasurement('default');
  }

  ngOnDestroy() {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  thePrice() {
    this.feetPrice = +this.response.item.attributes.discountedSrp.replace(',', '');
  }

  theFeetPrice() {
    this.feetPrice += this.standard_installation_fee;
  }

  getRelatedProducts() {
    if (this.relatedBrandArray) {
      if (this.relatedBrandArray.length !== 0) {
        this.relatedFilter = {
          brandArray: this.relatedBrandArray,
          categoryArray: this.relatedCategoryArray,
          typeArray: this.relatedTypeArray,
          sort: 'asc',
        };
      }
    }
    this.productService.getProducts(this.relatedFilter).pipe(takeUntil(this.destroy$)).subscribe((datas: any) => {
        const filtered = datas.data.filter(products => products.id !== this.response.item.id);
        // Filter again so that the current product shown doesn't show on the list
        this.products = filtered; // The data
        console.log(this.products);
      },
        error => {
          this.notyf.error(error);
    });
  }

  getProductDetails() {
    this.getRelatedProducts();
    if (+this.response.item.attributes.qty === 1 || +this.response.item.attributes.qty === 0 ) {
      this.btndisabled = true; // Disables the buttons
    }
    if (+this.response.item.attributes.qty === 0) {
      this.itemQty = 0, this.btnaddtocart = true; // Set the Shown QTY to 0 if qty is 0
    }

    this.imgArray = this.response.attributes.item_images; // Image Array

    this.titleService.setTitle(  `${this.response.attributes.item_name} : Buy ${this.response.attributes.item_name} Aircons online with cheap price | Cool Mart` ); // Title
    if (+this.response.item.attributes.qty === 0) return this.btndisabledminus = true, this.btndisabled = true; // If Qty = 0 or No Stock disable the addto cart + - btns
    if (this.imgArray.length !== 0) {
      // Check if Images are there
      this.gallery();
    }
  }

  gallery() {
    // NGX-Gallery
      this.galleryOptions = [
        {
            width: '470px',
            height: '590px',
            thumbnailsColumns: 3,
            imageAnimation: NgxGalleryAnimation.Fade,
            // thumbnailsRemainingCount: true,
            imageArrowsAutoHide: true,
            thumbnailsArrowsAutoHide: true,
            previewCloseOnClick: true,
            previewCloseOnEsc: true,
            previewZoom: true,
            previewRotate: true
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '500px',
            imagePercent: 80,
            thumbnailsPercent: 40,
            thumbnailsMargin: 20,
            thumbnailMargin: 20,
            thumbnailsColumns: 3
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false ,
            width: '100%',
            height: '300px',
            thumbnailsColumns: 2
        }
    ];

      this.galleryImages = [];
      for (const imgUrl of this.imgArray) {
      const image = {
        small: this.apiUrl + '/' + imgUrl,
        medium: this.apiUrl + '/' + imgUrl,
        big: this.apiUrl + '/' + imgUrl
      };

      this.galleryImages.push(image);
    }

  }



  addQty() {
    if (+this.response.item.attributes.qty === +this.itemQty) {
      this.btndisabled = true;
    } else {
      this.itemQty += 1;
      this.btndisabledminus = false;
      this.btnaddtocart = false;
      if (+this.response.item.attributes.qty === +this.itemQty) {
        this.btndisabled = true;
      }
    }
  }

  decreaseQty() {
    if (+this.itemQty === 0) {
      this.btndisabledminus = true;
      this.btnaddtocart = true;
      this.btndisabled = true;
    } else {
      this.itemQty -= 1;
      this.btndisabled = false;
      if (+this.itemQty === 0) {
        this.btndisabledminus = true;
        this.btnaddtocart = true;
        this.btndisabled = false;
      }
    }
  }

  getReviews() {
    this.productService.getProductReviews(this.response.item.attributes.slug, this.reviewPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
      this.reviews = data.data;
      this.reviewMeta = data.meta;
      this.reviewLinks = data.links;
    });
  }
  changePageReview(page: string) {
    this.reviewPage = page;
    this.getReviews();
  }
  customMeasurement($event) {
    if ($event === 'custom') {
      this.thefeet = +this.response.attributes.services.total_feet;
      this.service_name = 'Standard Installation Fee';
      if (this.thefeet > 10) {
        this.btndecreaseFeet = false;
      }
      const excessfeet = this.thefeet - 10;
      const excessprice = excessfeet * 300;
      this.feetValue(this.thefeet);
      this.theFeetPrice();
      this.feetPrice += excessprice;
      this.btnincreaseFeet = false;
      this.customFeet = false;
    } else if ($event === 'default') {
      this.thefeet = 10;
      this.service_name = 'Standard Installation Fee';
      this.feetValue(10);
      this.theFeetPrice();
      this.btnincreaseFeet = true;
      this.btndecreaseFeet = true;
      this.customFeet = false;
    } else if ($event === 'nothing') {
      this.service_name = null;
      this.thefeet = null;
      this.customFeet = true;
      this.thePrice();
      this.feetmsg = '';
    }
  }
  decreaseFeet() {
    this.btnincreaseFeet = false;
    if (this.thefeet === 10) {
      this.btndecreaseFeet = true;
    } else {
      this.thefeet -= 1;
      this.feetPrice -= 300;
      this.btndecreaseFeet = false;
      if (+this.thefeet === 10) {
        this.btndecreaseFeet = true;
      }
    }
  }
  increaseFeet() {
    if (this.thefeet >= 99) {
      this.btnincreaseFeet = true;
      this.btndecreaseFeet = false;
    } else {
      this.thefeet += 1;
      this.feetPrice += 300;
      this.btndecreaseFeet = false;
      this.btnincreaseFeet = false;
    }

  }
  feetValue(value) {
    const prodPrice = +this.response.item.attributes.discountedSrp.replace(',', '');
    this.feetPrice = prodPrice;
  }
}
