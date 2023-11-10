import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentConsComponent } from './equipament-cons.component';

describe('EquipamentConsComponent', () => {
  let component: EquipamentConsComponent;
  let fixture: ComponentFixture<EquipamentConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentConsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
