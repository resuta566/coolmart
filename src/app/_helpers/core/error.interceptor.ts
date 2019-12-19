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

  constructor(
      @Inject(NOTYF) private notyf: Notyf,
      private authenticationService: AuthenticationService,
      private router: Router,
      ) { }
    error: any;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status == 401) {
              // auto logout if 401 response returned from api
              this.notyf.error(err.error.message);
              this.authenticationService.logout();
              location.reload(true);
            }

            if(err.status == 403){
              this.notyf.error(err.error.message || err.error.error);
              this.router.navigate(['/pages/email-verification']);
            }

            if(err.status == 404){
              console.log(err);
              this.router.navigate(['/pages/not-found']);
              this.notyf.error(err.error.message);
            }

            if(err.status == 422){
              this.error = err.error.error || err.error.errors.email[0] || err.statusText;
              this.notyf.error(err.error.errors.email[0]);
            }

            if(err.status == 500){
              this.notyf.error('Internal Server Error!');
            }
            if(err.status == 0){
              this.notyf.error('Server Responded as '+ err.statusText);
            }

            this.error = err.error.error || err.error.message || err.statusText;
            console.error(err);
            return throwError(this.error);
        }))
    }
}
