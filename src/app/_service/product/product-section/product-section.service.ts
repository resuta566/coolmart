import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map, filter } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Products } from '@app/_models/products/products';
import { Reviews } from '@app/_models/products/reviews/reviews';
import { Filter } from '@app/_models/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductSectionService {
  null = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  constructor(
    private http: HttpClient
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

  sponsoredProducts(){
    return this.http.get(`${environment.apiUrl}/api/featured-brand`,{ headers: this.httpOptions.headers }).pipe(
      tap(_=> console.log('fetched sponsored'))

    );
  }

}
