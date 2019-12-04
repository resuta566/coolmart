import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  showAll = false;
  constructor() { }

  ngOnInit() {
  }

  show(){
    this.showAll = !this.showAll;
  }
}
