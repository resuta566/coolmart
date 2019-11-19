import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
    constructor(
        @Inject(NOTYF) private notyf: Notyf,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
          //logged in so redirect to login page with the return url
          this.router.navigate(['dashboard'], { queryParams: { returnUrl: state.url } });
          this.notyf.error(`You're already Logged In!`);
          return false;
        }
        //not logged in so return true
        return true;
    }
}
