import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '@app/_service';
import { CartService } from '@app/_service/cart-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  r: any;

  constructor(
    private alertService: AlertService,
    private cd: ChangeDetectorRef,
    private cartService: CartService
    ) { }

  ngOnInit() {
  }


}
