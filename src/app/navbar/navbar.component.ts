import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_service';
import { User } from '@app/_models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  isLogged = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn(){
    if(this.currentUser) return true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/sign_in_up'])
}
}
