import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductSectionComponent } from './home-product-section.component';

describe('HomeProductSectionComponent', () => {
  let component: HomeProductSectionComponent;
  let fixture: ComponentFixture<HomeProductSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProductSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
