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
    const currentUser = localStorage.getItem('resendVerification').replace(/"/g,'');
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${currentUser}`
      })
    };
    return this.http.get(`${environment.apiUrl}/api/email/resend`, httpOptions);
  }
}
