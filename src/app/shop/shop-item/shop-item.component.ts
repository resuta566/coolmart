import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '@app/_service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Title } from '@angular/platform-browser';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  apiUrl = `${environment.apiUrl}`;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imgArray = [];
  img: string;
  slug: string;
  response: any;
  products: Object;
  btndisabled = false;
  btndisabledminus = false;
  btnclass = 'single_add_to_cart_button button';
  relatedProductsbtnclass = 'button add_to_cart_button';
  label = 'Add To Cart';
  itemQty = 1;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private route: ActivatedRoute,
    private service: ProductService,
    private titleService: Title
    ) { }

  ngOnInit() {
    //Get the item slug
    this.route.paramMap.subscribe(rt => {
      this.slug = rt.get('slug');
    });
    // console.log(this.route);
    this.getProduct(this.slug);
    this.getRelatedProducts();
    this.decreaseQty();
  }

  ngAfterViewInit(): void {
    //After Load Initialize itemQty = 2 and decreaseQty funtion then the itemQty is decrease by 1
    this.itemQty = 2;
    this.decreaseQty();
  }

  getRelatedProducts() {
    this.service.getProducts().subscribe((datas: any) => {
      this.products = datas.data;
      },
        error => {
          this.notyf.error(error);
    });
  }

  getProduct(slug){
    //Get Single Product from API
    this.service.getProduct(slug).subscribe(r =>{
      this.response = r;
      this.imgArray = this.response.attributes.images;
      this.titleService.setTitle(  `${this.response.attributes.name} : Buy ${this.response.attributes.name} Aircons online with cheap price | Cool Mart` );
      if(+this.response.attributes.qty === 0) return this.btndisabledminus = true, this.btndisabled = true; //If Qty = 0 or No Stock disable the addto cart + - btns
      if(this.imgArray !== null){
        //Check if Images are there
        this.gallery();
      }
    });
  }

  gallery(){
    //NGX-Gallery
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
            height: '300px',
            imagePercent: 80,
            thumbnailsPercent: 10,
            thumbnailsMargin: 20,
            thumbnailMargin: 20,
            thumbnailsColumns: 3
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false ,
            width: "100%",
            height: "200px",
            thumbnailsColumns: 2
        }
    ];

    this.galleryImages = [];
    for(const imgUrl of this.imgArray) {
      const image = {
        small: this.apiUrl+'/'+imgUrl,
        medium: this.apiUrl+'/'+imgUrl,
        big: this.apiUrl+'/'+imgUrl
      }
      this.galleryImages.push(image)
    }
  }



  addQty() {
    if(this.itemQty == this.response.attributes.qty){
      this.btndisabled = true;
    }else{
    this.itemQty += 1;
    this.btndisabled = false;
    this.btndisabledminus = false;
    }
  }

  decreaseQty() {
    if(this.itemQty == 0){ //Disabled the minus btn and Enable the plus btn else minus 1 & enable minus btn & plus btn
      this.btndisabled = false;
      this.btndisabledminus = true;
    }else{
      this.itemQty -= 1;
      this.btndisabled = false;
      this.btndisabledminus = false;
      if(this.itemQty == 0){//Disabled the minus btn and Enable the plus btn
        this.btndisabled = false;
        this.btndisabledminus = true;
      }
    }
  }
}
