import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDayEventsComponent } from './os-day-events.component';

describe('OsDayEventsComponent', () => {
  let component: OsDayEventsComponent;
  let fixture: ComponentFixture<OsDayEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDayEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsDayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
