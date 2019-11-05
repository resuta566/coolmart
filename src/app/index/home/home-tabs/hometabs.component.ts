import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_service/product.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'home-tabs',
  templateUrl: './hometabs.component.html',
  styleUrls: ['./hometabs.component.scss']
})
export class HometabsComponent implements OnInit{
  products: Object;
  btnclass = 'button add_to_cart_button';
  label = 'Add To cart';
  apiUrl = `${environment.apiUrl}`
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((datas: any) => {
      this.products = datas.data;
      console.log(datas);
      },
        error => {
        console.log(error);
    });
  }


}
