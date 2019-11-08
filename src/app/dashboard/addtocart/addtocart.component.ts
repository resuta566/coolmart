import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent implements OnInit {
  @Input('itemId') itemId: number;
  @Input('qty') qty: number;
  @Input('label') label: string;
  @Input('btnclass') btnclass: string;
  @Input('option') option?: false;

  cartForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  addtocart(){
    let currentUser = this.authenticationService.currentUserValue;
    this.cartForm = this.formBuilder.group({
      //this.itemId is a string so + would make it an integer
      itemId: [+this.itemId, Validators.required],
      authId: [currentUser.auth_id, Validators.required],
      qty: [this.qty, Validators.required]
    });
    this.cartService.addToDataBaseCart(this.cartForm.value);
  }

}
