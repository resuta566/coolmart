import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopThisMonthComponent } from './home-top-this-month.component';

describe('HomeTopThisMonthComponent', () => {
  let component: HomeTopThisMonthComponent;
  let fixture: ComponentFixture<HomeTopThisMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTopThisMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopThisMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
