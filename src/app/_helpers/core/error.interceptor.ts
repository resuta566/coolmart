import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      ) { }
    error: any;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          console.log(err);
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }

            if(err.status == 404){
              // this.router.navigate(['/pages/not-found']);
              console.log(err.status);
            }

            this.error = err.error.error || err.statusText || err.error.errors.email[0];
            // console.log(err);
            return throwError(this.error);
        }))
    }
}
