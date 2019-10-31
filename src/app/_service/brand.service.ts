import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Brands } from '@app/_models/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

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

  getBrands(){
    return this.http.get<Brands[]>(`${environment.apiUrl}/api/brands`).pipe(
      tap(_ => console.log('fetched brands')),
      catchError(this.handleError<Brands[]>('getBrands', []))
      );
  }
}
