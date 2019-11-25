import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Products } from '@app/_models/products/products';
import { Observable } from 'rxjs';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ShopItemResolverService implements Resolve<Products>{

  constructor(
    private productService: ProductService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Products>{
    return this.productService.getProduct(route.params['slug']);
  }
}
