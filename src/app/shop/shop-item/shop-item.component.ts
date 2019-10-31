import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

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
  constructor(
    private route: ActivatedRoute,
    private service: ProductService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(rt => {
      this.slug = rt.get('slug');
    });
    // console.log(this.route);
    this.getProduct(this.slug);
    this.getRelatedProducts();
  }

  getRelatedProducts() {
    this.service.getProducts().subscribe((datas: any) => {
      this.products = datas.data;
      console.log(this.products);
      },
        error => {
        console.log(error);
    });
  }

  getProduct(slug){
    this.service.getProduct(slug).subscribe(r =>{

      this.response = r;
      this.imgArray = this.response.attributes.images;
      // console.log(this.response.relationships);
      if(this.imgArray !== null){
        this.gallery();
      }
    });

  }

  gallery(){
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
          breakpoint: 300,
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

  addtoCart(){

  }


  // addQty(item) {
  //   const i = this.products.indexOf(item);
  //   if(this.products[i].stockQty !== this.products[i].qty){
  //   this.products[i].qty += 1;
  //   this.subTotal();
  //   }else {
  //     alert('Stock Limit');
  //   }
  // }

  // decreaseQty(item) {
  //   const i = this.products.indexOf(item);
  //   if(this.products[i].qty !== 1){
  //   this.products[i].qty -= 1;
  //   this.subTotal();
  //   }else {
  //     alert('Minimum.');
  //   }
  // }
}
