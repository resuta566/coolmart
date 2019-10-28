import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Products } from '@app/_models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  getProducts() {
    return this.http.get<Products[]>(`${environment.apiUrl}/api/items`).pipe(
      tap(_ => console.log('fetched products')),
      catchError(this.handleError<Products[]>('getProducts', []))
      );
  }

  getProduct(slug: string): Observable<Products> {
    return this.http.get<Products>(`${environment.apiUrl}/api/items/${slug}`).pipe(
      tap(_ => console.log('fetched product'))
      );
  }
}
