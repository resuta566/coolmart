import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.user;
  }

}
