import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedOrderComponent } from './returned-order.component';

describe('ReturnedOrderComponent', () => {
  let component: ReturnedOrderComponent;
  let fixture: ComponentFixture<ReturnedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
