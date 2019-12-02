import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsCheckoutComponent } from './payment-options-checkout.component';

describe('PaymentOptionsCheckoutComponent', () => {
  let component: PaymentOptionsCheckoutComponent;
  let fixture: ComponentFixture<PaymentOptionsCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionsCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
