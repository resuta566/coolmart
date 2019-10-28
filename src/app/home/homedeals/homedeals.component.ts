import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
@Component({
  selector: 'home-deals',
  templateUrl: './homedeals.component.html',
  styleUrls: ['./homedeals.component.scss']
})
export class HomedealsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  img = "http://192.168.254.101/newgencool-backend/public/uploads/brand/logo/mitsubishi_1571814709.jpg";
}
