import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BrandService } from '@app/_service/brand/brand.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home-bottom-brands-carousel',
  templateUrl: './home-bottom-brands-carousel.component.html',
  styleUrls: ['./home-bottom-brands-carousel.component.scss']
})
export class HomeBottomBrandsCarouselComponent implements OnInit, OnDestroy {

  apiUrl = `${environment.apiUrl}`;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  brands: any;
  imgUrl = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private brandService: BrandService
  ) { }

  ngOnInit() {
    this.brandService.getBrands().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.brands = data.data;
      if(this.brands !== null){
        this.gallery();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  gallery(){
    this.galleryOptions = [
      {
          image: false,
          width: "100%",
          height: '200px',
          thumbnailsColumns: 4,
          imagePercent: 100,
          thumbnailsPercent: 70,
          thumbnailMargin: 20,
          imageArrowsAutoHide: true,
          thumbnailsArrowsAutoHide: true,
          previewCloseOnClick: true,
          previewCloseOnEsc: true,
          previewZoom: true,
          previewRotate: true
      },
      // max-width 992
      {
          breakpoint: 992,
          width: '100%',
          height: '300px',
          imagePercent: 100,
          thumbnailsPercent: 70,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          thumbnailsColumns: 2
      },
      // max-width 400
      {
          breakpoint: 561,
          preview: false ,
          width: "100%",
          height: "200px",
          thumbnailsColumns: 2
      }
  ];

  this.galleryImages = [];

  for(const brand of this.brands) {
    this.imgUrl = brand.attributes.logo;
    const image = {
      small: this.apiUrl+'/'+this.imgUrl,
      medium: this.apiUrl+'/'+this.imgUrl,
      big: this.apiUrl+'/'+this.imgUrl
    }
    this.galleryImages.push(image);
  }

  // for(const imgUrl of this.imgArray) {
  //   const image = {
  //     small: this.apiUrl+'/'+imgUrl,
  //     medium: this.apiUrl+'/'+imgUrl,
  //     big: this.apiUrl+'/'+imgUrl
  //   }
  //   this.galleryImages.push(image)
  // }
  }
}
