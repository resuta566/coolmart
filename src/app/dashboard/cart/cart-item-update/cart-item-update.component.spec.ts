import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemUpdateComponent } from './cart-item-update.component';

describe('CartItemUpdateComponent', () => {
  let component: CartItemUpdateComponent;
  let fixture: ComponentFixture<CartItemUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
