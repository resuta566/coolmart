import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Router } from '@angular/router';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { AuthenticationService } from '@app/_service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  currentUser = this.authenticationService.currentUserValue;
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

    reviews(page?: string){
      let actualPage = page || `${environment.apiUrl}/api/items/reviewable`;
      if(this.currentUser){
        return this.http.get(actualPage, this.httpOptions)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getReviewable', []))
        );
      }
    }

    reviewed(page?: string){
      let actualPage = page || `${environment.apiUrl}/api/items/reviewed`;
      if(this.currentUser){
        return this.http.get(actualPage, this.httpOptions)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getReviewable', []))
        );
      }
    }

    oneReviewed(slug: string){
      if(this.currentUser){
        return this.http.get(`${environment.apiUrl}/api/items/review/${slug}`, this.httpOptions)
              .pipe(
                // tap(_ => console.log('fetched cart')),
                catchError(this.handleError('Reviewed Item', []))
            );
      }
    }

    writeReview(slug: string){
      return this.http.get(`${environment.apiUrl}/api/items/review/${slug}/create`, this.httpOptions)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('write Review', []))
        );
    }

    sendReview(itemId: number,stars:number, comments: string){
      if(this.currentUser){
        return this.http.post(`${environment.apiUrl}/api/items/reviews`, { itemId:itemId, stars:stars, comments:comments},this.httpOptions)
          .pipe(
            // tap(_ => console.log('fetched cart', _)),
            catchError(this.handleError('getReviewable', []))
        );
      }
    }
}
