import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  btnclass="button add_to_cart_button addToCartBtn";
  label = "Add to cart";
  products: Object;
  imgThumb: string;
  img: string;
  apiImgUrl = `${environment.apiUrl}`;
  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((datas: any) => {
      this.products = datas.data;
      console.log(this.products)
      },
        error => {
        console.log(error);
    });
  }

  addToCart(){
    this.router.navigate(['/cart']);
  }
}
