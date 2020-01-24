import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermsFaqService {

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

  getTerms() {
    return this.http.get(`${environment.apiUrl}/api/terms`).pipe(
      tap(_ => console.log('fetched terms')),
      catchError(this.handleError('getTerms', []))
      );
  }

  getFaqs() {
    return this.http.get(`${environment.apiUrl}/api/faqs`).pipe(
      tap(_ => console.log('fetched faqs')),
      catchError(this.handleError('getFaqs', []))
      );
  }
}
