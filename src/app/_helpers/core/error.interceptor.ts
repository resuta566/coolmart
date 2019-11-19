import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

            if(err.status == 500){
              this.notyf.error('Internal Server Error!');
            }

            this.error = err.error.error || err.statusText || err.error.errors.email[0];
            // console.log(err);
            return throwError(this.error);
        }))
    }
}