import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsConsComponent } from './os-cons.component';

describe('OsConsComponent', () => {
  let component: OsConsComponent;
  let fixture: ComponentFixture<OsConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsConsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
