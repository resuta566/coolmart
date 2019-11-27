import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Cart } from '@app/_models/cart/cart';
import { AuthenticationService } from '..';
import { Router } from '@angular/router';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
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

  addToDataBaseCart(cart: Cart){
    return this.http.post(`${environment.apiUrl}/api/cart`, cart ).pipe(
      map((data: any) => {
        // alert(data.success);
        console.log(data);
        this.notyf.success(data.success);
      }),
      catchError(this.handleError('getCart', []))
    ).subscribe(serverdata=>{});
  }

  carts(){
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      let authId = currentUser.user.id.toString();
      return this.http.get(`${environment.apiUrl}/api/cart` , { params: { authId: authId, } } )
        .pipe(
          // tap(_ => console.log('fetched cart')),
          catchError(this.handleError('getCart', []))
      );
    }

  }

  updateItemCartQty(cartId: number, btn: string){
    return this.http.patch(`${environment.apiUrl}/api/cart/${+cartId}`, { action: btn } ).pipe(
      map(data=>{
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
    return this.http.delete(`${environment.apiUrl}/api/cart/${id}`).pipe(
      map(data=>{
        this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart']);
          this.notyf.error('Item(s) remove from cart!');
        });
      }),
      tap(_ => {
      }),
      catchError(this.handleError('updateCart', []))
    );
  }
}
