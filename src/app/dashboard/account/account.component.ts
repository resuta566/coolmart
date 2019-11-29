import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_service';
import { User } from '@app/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.user;
  }

}
