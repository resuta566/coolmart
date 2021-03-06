import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSectionService } from '@app/_service/product/product-section/product-section.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'home-product-section',
  templateUrl: './home-product-section.component.html',
  styleUrls: ['./home-product-section.component.scss']
})
export class HomeProductSectionComponent implements OnInit, OnDestroy {

  loading = true;
  apiUrl = `${environment.apiUrl}`;
  brandProduct: any;
  constructor(
    private productSecService: ProductSectionService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    setTimeout(()=>{
      this.sponsoredProducts();
    },1000)
  }

  ngOnDestroy(){

  }

  sponsoredProducts(){
    this.productSecService.sponsoredProducts().pipe().subscribe((data: any)=>{
      this.brandProduct = data;
      if(this.brandProduct.data.relationships.items.data.length > 0){
        this.loading = false;
      }
      console.log('brandProduct',this.brandProduct);
    });
  }
}
