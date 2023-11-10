import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConsComponent } from './event-cons.component';

describe('EventConsComponent', () => {
  let component: EventConsComponent;
  let fixture: ComponentFixture<EventConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventConsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
