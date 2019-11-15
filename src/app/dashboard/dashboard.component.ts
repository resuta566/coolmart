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
  r: any;
  color = 'warn';
  mode = 'indeterminate';
  value = 20;
  loading = false;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    }, 1000);
  }


}
