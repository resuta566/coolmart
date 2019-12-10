import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { AuthenticationService } from '..';
import { Router } from '@angular/router';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Accept' : 'application/json'})
    };

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

    paypalPaymentMethod(orderId: number){
      let currentUser = this.authenticationService.currentUserValue;
      let params = new HttpParams().set('transaction_id', orderId.toString());
      if(currentUser){
        return this.http.get(`${environment.apiUrl}/api/payment`,
              { params: params })
              .pipe(
              tap(_ => console.log('fetched cart'))
              );
      }
    }

    afterPlaceOrder(orderId: number){
      let currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        return this.http.get(`${environment.apiUrl}/api/transactions/${orderId}`,this.httpOptions).pipe(
          tap(_ => console.log('fetched cart'))
          );
      }
    }
}
