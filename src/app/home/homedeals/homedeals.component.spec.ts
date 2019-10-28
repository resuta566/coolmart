import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedealsComponent } from './homedeals.component';

describe('HomedealsComponent', () => {
  let component: HomedealsComponent;
  let fixture: ComponentFixture<HomedealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomedealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
