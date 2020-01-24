import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Types } from '@app/_models/types/types';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

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

  getTypes() {
    return this.http.get<Types[]>(`${environment.apiUrl}/api/types`).pipe(
      tap(_ => console.log('fetched types')),
      catchError(this.handleError<Types[]>('getTypes', []))
      );
  }
}
