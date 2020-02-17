import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingLogsComponent } from './tracking-logs.component';

describe('TrackingLogsComponent', () => {
  let component: TrackingLogsComponent;
  let fixture: ComponentFixture<TrackingLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
