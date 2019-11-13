import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(NOTYF) private notyf: Notyf,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }else{
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/sign_in'], { queryParams: { returnUrl: state.url } });
          this.notyf.error('Please Log In!');
          return false;
        }
    }
}
