import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit, AfterViewInit {

  imgArray = [];
  img: string;
  slug: string;
  response: any;
  apiUrl = `${environment.apiUrl}`;
  constructor(
    private route: ActivatedRoute,
    private service: ProductService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(rt => {
      this.slug = rt.get('slug');
    });
    // console.log(this.route);

    this.service.getProduct(this.slug).subscribe(r =>{

      this.response = r;
      this.imgArray = this.response.attributes.images;
      let string: string;
      for(let i=0;i<=this.imgArray.length -1;i++){
        string+= ' <a href="images/single-product/s1-1.jpg" class="zoom" title="" data-rel="prettyPhoto[product-gallery]"><img src="this.apiUrl/this.imgArray[i]" attr.data-echo="{ this.apiUrl }/this.imgArray[i]" class="wp-post-image" alt=""></a>';
      }
      string = string.replace('undefined','');
      jQuery('.images').append(string);

    })
  }

  ngAfterViewInit() {
    setTimeout(function () {
      jQuery('.images').owlCarousel({
        loop: true,
        margin: 10,
         nav: false,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 4
          }
        }

      });
    }, 300);
}

}
