import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDayComponent } from './os-day.component';

describe('OsDayComponent', () => {
  let component: OsDayComponent;
  let fixture: ComponentFixture<OsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
