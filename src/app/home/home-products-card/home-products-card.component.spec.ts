import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductsCardComponent } from './home-products-card.component';

describe('HomeProductsCardComponent', () => {
  let component: HomeProductsCardComponent;
  let fixture: ComponentFixture<HomeProductsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProductsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
