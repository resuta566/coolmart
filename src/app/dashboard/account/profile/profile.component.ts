import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { AuthenticationService } from '@app/_service';
>>>>>>> development

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
=======
  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.user;
>>>>>>> development
  }

}
