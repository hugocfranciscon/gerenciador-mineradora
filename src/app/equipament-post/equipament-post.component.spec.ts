import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentPostComponent } from './equipament-post.component';

describe('EquipamentPostComponent', () => {
  let component: EquipamentPostComponent;
  let fixture: ComponentFixture<EquipamentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
