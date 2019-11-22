import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ResendVerficationService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
    ) {
  }

  resendverification(){
    let currentUser = this.authenticationService.currentUserValue;
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`
      })
    };
    return this.http.get(`${environment.apiUrl}/api/email/resend`, httpOptions);
  }
}
