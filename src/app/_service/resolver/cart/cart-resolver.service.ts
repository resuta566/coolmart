import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '@app/_service/cart/cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<any>{

  constructor(
    private cartService: CartService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    // console.log(route.params);
    return this.cartService.cartItemEdit(route.params['itemId']);
  }
}
