import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_service/core/authentication.service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';


export class Return {
  cartId: number;
  refund_amount: number;
  thereason: string;
  additional_info: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
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

    returnOrders(page?: string) {
      const actualPage = page || `${environment.apiUrl}/api/returns`;
      return this.http.get(actualPage, this.httpOptions)
        .pipe(
          // tap(_ => console.log('fetched cart')),
          catchError(this.handleError('getAllCancels', []))
      );
    }

    returnViewItem(orderId: number) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.get(`${environment.apiUrl}/api/transactions/${orderId}/returned`, this.httpOptions).pipe(
          tap(_ => console.log('fetched return Item'))
          );
      }
    }

    returnShowItem(cartId: number) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.get(`${environment.apiUrl}/api/transaction-item/${cartId}`)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getWillBeCancelled Item', []))
        );
      }
    }

    returnOrderPut(order: Return) {
      console.log(order);
      const params = new HttpParams()
                  .set('reason', order.thereason)
                  .set('optional', order.additional_info)
                  .set('refund_amount', order.refund_amount.toString());
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.put(`${environment.apiUrl}/api/cart-cancellation/${order.cartId}`, null,
          {params: params}
          )
          .pipe(
            tap(_ => console.log('fetched return put response')),
            catchError(this.handleError('returnDetails response', []))
        );
      }

    }
}
