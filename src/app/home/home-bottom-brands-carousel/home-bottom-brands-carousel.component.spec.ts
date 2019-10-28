import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBottomBrandsCarouselComponent } from './home-bottom-brands-carousel.component';

describe('HomeBottomBrandsCarouselComponent', () => {
  let component: HomeBottomBrandsCarouselComponent;
  let fixture: ComponentFixture<HomeBottomBrandsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBottomBrandsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBottomBrandsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
