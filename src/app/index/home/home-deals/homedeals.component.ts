import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
@Component({
  selector: 'home-deals',
  templateUrl: './homedeals.component.html',
  styleUrls: ['./homedeals.component.scss']
})
export class HomedealsComponent implements OnInit {

  constructor() { }

  img = 'http://192.168.254.101/coolmart365-backend/public/uploads/brand/logo/haier_1573454238.jpg';

  ngOnInit() {
  }
}
