import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Cart } from '@app/_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Array<any>;

  addOne = false;
  addQty = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient) { }

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
        alert(data.success);
      }),
      catchError(this.handleError('getCart', []))
    ).subscribe(serverdata=>{
      console.log(serverdata)
    });
  }
  carts(){
    return this.http.get(`${environment.apiUrl}/api/cart`).pipe(
      tap(_ => console.log('fetched cart')),
      catchError(this.handleError('getCart', []))
      );
  }
}
