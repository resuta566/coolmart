import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBottomProductsComponent } from './home-bottom-products.component';

describe('HomeBottomProductsComponent', () => {
  let component: HomeBottomProductsComponent;
  let fixture: ComponentFixture<HomeBottomProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBottomProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBottomProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
