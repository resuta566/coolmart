import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService, AuthenticationService } from '@app/_service';
import { CartService } from '@app/_service/cart/cart-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  currentUser: string;
  r: any;
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.user.name;
  }

}
