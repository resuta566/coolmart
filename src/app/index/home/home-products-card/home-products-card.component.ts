import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'home-products-card',
  templateUrl: './home-products-card.component.html',
  styleUrls: ['./home-products-card.component.scss']
})
export class HomeProductsCardComponent implements OnInit {

  products: Object;
  apiUrl = `${environment.apiUrl}`;
  imgArray = [];
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((datas: any) => {
      this.products = datas.data;
      },
        error => {
        console.log(error);
    });
  }
}
