import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Cart } from '@app/_models/cart/cart';
import { AuthenticationService } from '..';
import { Router } from '@angular/router';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { NavbarService } from '../navbar/navbar.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json'})
  };

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private navbarService: NavbarService
    ) { }

  private handleError<T> (operation = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.messages}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    }
  }

  addToDataBaseCart(cart: Cart, option? :boolean){
    return this.http.post(`${environment.apiUrl}/api/cart`, cart, this.httpOptions ).pipe(
      map((data: any) => {
        // console.log(data);
        if(data.success){
          this.navbarService.reload();
          this.notyf.success(data.success);
          if(option){
            this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/cart']);
            });
          }
        }
      }),
      catchError(this.handleError('getCart', []))
    ).subscribe(serverdata=>{});
  }

  cartItemEdit(cartId: number){
    return this.http.get(`${environment.apiUrl}/api/cart/${cartId}/edit`,this.httpOptions).pipe(
      // map((data: any)=>{
      // }),
      catchError(this.handleError('getWillUpdateCartItem', []))
    );
  }

  carts(){
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      return this.http.get(`${environment.apiUrl}/api/cart`,this.httpOptions)
        .pipe(
          // tap(_ => console.log('fetched cart')),
          catchError(this.handleError('getCart', []))
      );
    }else{
      return empty();
    }
  }

  updateItemCartQty(cartId: number, btn: string){
    return this.http.patch(`${environment.apiUrl}/api/cart/${+cartId}`, { action: btn },this.httpOptions ).pipe(
      map(data=>{
        this.navbarService.reload();
        this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart']);
        });
      }),
      tap(_ => {
      }),
      catchError(this.handleError('updateCart', []))
    );
  }



  removeItemCartQty(id: number){
    return this.http.delete(`${environment.apiUrl}/api/cart/${id}`,this.httpOptions).pipe(
      map(data=>{
        this.navbarService.reload();
        this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart']);
          this.notyf.error('Item(s) remove from cart!');
        });
      }),
      catchError(this.handleError('updateCart', []))
    );
  }
}
