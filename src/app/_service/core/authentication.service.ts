import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

export class ResetPassword {
  email?: string;
  password?: string;
  current_password?: string;
  new_password?: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    constructor(
      @Inject(NOTYF) private notyf: Notyf,
      private http: HttpClient,
      private router: Router
      ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

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

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/login`, { email, password }, this.httpOptions)
            .pipe(
              map(user => {
                  // Remove Email Resend Verification Token
                  localStorage.removeItem('resendVerification');
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  return user;
                })
            );
    }

    register(user: User) {
      return this.http.post(`${environment.apiUrl}/api/register`, user, this.httpOptions)
          .pipe(
            map((userData: User) => {
              localStorage.removeItem('resendVerification');
              localStorage.setItem('resendVerification', JSON.stringify(userData.accessToken));
              return userData;
            })
      );
    }

    // User Profile for Dashboard
    profile() {
      return this.http.get<User>(`${environment.apiUrl}/api/my-profile`, this.httpOptions)
             .pipe(
               catchError(this.handleError<User>('user Profile'))
             );
    }

    forgotPassword(email: string) {
      return this.http.post(`${environment.apiUrl}/api/password/create`, { email })
          .pipe(
            map((response: any) => {
              console.log(response);
              if (response.error) {
                this.notyf.error(response.error);
                this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/forgot-password/send-email']);
                });
              } else {
                this.notyf.success(response.message);
                this.router.navigate(['/sign_in']);
              }
            })
          );
    }

    // New Password for Requested Forgot Password
    resetNewPassword(reset: ResetPassword) {
      return this.http.post(`${environment.apiUrl}/api/password/reset`, reset)
          .pipe(
            map((response: any) => {
              this.notyf.success(response.message);
              this.router.navigate(['/sign_in']);
            }),
            retry(3),
            catchError(this.handleError('resetNewPassword', []))
          );
    }

    // Details for Reset Forgot Password
    resetDetails(token: string) {
      return this.http.get(`${environment.apiUrl}/api/password/find/${token}`)
          .pipe(
            retry(3),
            catchError(this.handleError('getResetDetails', []))
          );
    }

    // Logged In User Changed Pass
    resetUserPassword(resetpass: ResetPassword) {
      const body = {
        password: resetpass.current_password,
        new_password: resetpass.new_password
      };
      console.log(JSON.stringify(body));
      return this.http.post(`${environment.apiUrl}/api/password/change`, body)
          .pipe(
            map((response: any) => {
              if (response.message) { // Else Error
                this.notyf.success(response.message);
                this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/dashboard/account/profile']);
                });
              } else {
                this.notyf.error('Current ' + response.error);
              }
            }),
            retry(3),
            catchError(this.handleError('resetUserPassWord', []))
          );
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return this.http.post(`${environment.apiUrl}/api/logout`, null);
    }
}
