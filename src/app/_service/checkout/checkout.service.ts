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
export class CheckOutService {

  httpOptions = {
    headers: new HttpHeaders({ 'Accept' : 'application/json'})
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

  checkoutAddress(){
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      return this.http.get(`${environment.apiUrl}/api/checkout-address`,this.httpOptions).pipe(
        catchError(this.handleError('getCheckoutAddress', []))
      );
    }
  }

  checkout(){
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      return this.http.post(`${environment.apiUrl}/api/transactions`,this.httpOptions).pipe(
        tap(_=>{
          console.log(_, 'checkout');
        }),
        catchError(this.handleError('getCheckoutAddress', []))
      );
    }
  }

}
