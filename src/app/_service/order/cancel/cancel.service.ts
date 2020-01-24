import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_service/core/authentication.service';

export class CancelOrder {
  cartId: number;
  reason: string;
  optional: string;
}

@Injectable({
  providedIn: 'root'
})
export class CancelService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Accept' : 'application/json'})
    };

    private handleError<T>(operation = 'operation' , result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.messages}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);

      };
    }

    cancelOrders(page?: string) {
      const actualPage = page || `${environment.apiUrl}/api/cancellations`;
      return this.http.get(actualPage, this.httpOptions)
        .pipe(
          // tap(_ => console.log('fetched cart')),
          catchError(this.handleError('getAllCancels', []))
      );
    }

    cancelViewItem(orderId: number) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.get(`${environment.apiUrl}/api/transactions/${orderId}/cancelled`, this.httpOptions).pipe(
          tap(_ => console.log('fetched Cancelled Item'))
          );
      }
    }

    cancelShowItem(cartId: number) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.get(`${environment.apiUrl}/api/transaction-item/${cartId}`, this.httpOptions)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getWillBeCancelled Item', []))
        );
      }
    }

    cancelOrder(order: CancelOrder ) {
      console.log(order);
      const params = new HttpParams().set('reason', order.reason).set('optional', order.optional);
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.put(`${environment.apiUrl}/api/cart-cancellation/${order.cartId}`, null,
          {params: params}
          )
          .pipe(
            tap(_ => console.log('fetched cancelDetails')),
            catchError(this.handleError('cancelDetails', []))
        );
      }

    }
}
