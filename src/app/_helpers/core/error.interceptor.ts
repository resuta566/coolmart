import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '@app/_service';
import { Router } from '@angular/router';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  error: any;

  constructor(
      @Inject(NOTYF) private notyf: Notyf,
      private authenticationService: AuthenticationService,
      private router: Router,
      ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            // tslint:disable-next-line: triple-equals
            if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.notyf.error(err.error.message);
              this.authenticationService.removeToken();
            }

            if (err.status === 403) {
              console.log(err);
              this.notyf.error(err.error.message || err.error.error);
              if (err.error.verification === true) {
                this.router.navigate(['/pages/email-verification']);
              } else {
                this.router.navigate(['/pages/not-found']);
              }
            }

            if (err.status === 404) {
              console.log(err);
              this.router.navigate(['/pages/not-found']);
              this.notyf.error('Not Found!');
            }

            if (err.status === 422) {
              this.error = err.error.error || err.error.errors.email[0]
              || err.error.errors.month[0] || err.error.errors.year[0]
              || err.error.errors.date[0] || err.message  || err.statusText ;
              this.notyf.error(this.error);
            }

            if (err.status >= 500) {
              this.notyf.error('Internal Server Error!');
            }
            if (err.status === 0) {
              this.notyf.error('Server Responded as ' + err.statusText);
            }

            this.error = err.error.error || err.error.message || err.statusText;
            console.error(err);
            return throwError(this.error);
        }));
    }
}
