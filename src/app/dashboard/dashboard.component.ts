import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService, AuthenticationService } from '@app/_service';
import { CartService } from '@app/_service/cart/cart-service.service';
import { Title } from '@angular/platform-browser';
import { routerAnimation } from '@app/_animations/coolmart.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerAnimation()]
})
export class DashboardComponent implements OnInit {

  currentUser: string;
  r: any;
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.user;
  }


  getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData.num === undefined
        ? -1
        : outlet.activatedRouteData.num;

    return res;
  }
}
