import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_service';
import { CartService } from '@app/_service/cart-service.service';
import { BrandService } from '@app/_service/brand.service';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
