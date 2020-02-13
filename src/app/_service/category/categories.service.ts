import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Categories } from '@app/_models/categories/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient) { }

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
  /**
   * Get all Categories
   * To be edited
   */
  getCategories() {
    return this.http.get<Categories[]>(`${environment.apiUrl}/api/categories`).pipe(
      tap(_ => console.log('fetched categories')),
      catchError(this.handleError<Categories[]>('getCategories', []))
      );
  }
}
