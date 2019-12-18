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
<<<<<<< HEAD
    let currentUser = this.authenticationService.currentUserValue;
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`
=======
    let currentUser = localStorage.getItem('resendVerification').replace(/"/g,'');
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${currentUser}`
>>>>>>> development
      })
    };
    return this.http.get(`${environment.apiUrl}/api/email/resend`, httpOptions);
  }
}
