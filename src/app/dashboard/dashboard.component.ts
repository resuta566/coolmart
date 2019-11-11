import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '@app/_service';
import { CartService } from '@app/_service/cart/cart-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {}


}
