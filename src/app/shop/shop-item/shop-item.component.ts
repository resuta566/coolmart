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
  btnaddtocart = false;
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
  }

  ngAfterViewInit(): void {
    this.getRelatedProducts();
  }

  getRelatedProducts() {

    this.service.getProducts().subscribe((datas: any) => {
      this.products = datas.data;
      },
        error => {
          this.notyf.error(error);
    });
  }

  getProduct(slug: string){
    //Get Single Product from API
    this.service.getProduct(slug).subscribe(r =>{
      this.response = r;
      if(this.response.attributes.qty == 1 || this.response.attributes.qty == 0 )
        this.btndisabled = true; //Disables the buttons
      if(this.response.attributes.qty == 0)
        this.itemQty = 0, this.btnaddtocart = true; // Set the Shown QTY to 0 if qty is 0

      this.imgArray = this.response.attributes.images; //Image Array
      this.titleService.setTitle(  `${this.response.attributes.name} : Buy ${this.response.attributes.name} Aircons online with cheap price | Cool Mart` );// Title
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
    if(this.response.attributes.qty == this.itemQty){
      this.btndisabled = true;
    }else{
      this.itemQty +=1;
      this.btndisabledminus = false;
      this.btnaddtocart = false;
      if(this.response.attributes.qty == this.itemQty){
        this.btndisabled = true;
      }
    }
  }

  decreaseQty() {
    if(this.itemQty == 0){
      this.btndisabledminus = true;
      this.btnaddtocart = true;
      this.btndisabled = true;
    }else{
      this.itemQty -= 1;
      this.btndisabled = false;
      if(this.itemQty == 0){
        this.btndisabledminus = true;
        this.btnaddtocart = true;
        this.btndisabled = false;
      }
    }
  }
}
