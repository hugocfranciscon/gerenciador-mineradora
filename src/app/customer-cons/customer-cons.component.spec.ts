import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsComponent } from './customer-cons.component';

describe('CustomerConsComponent', () => {
  let component: CustomerConsComponent;
  let fixture: ComponentFixture<CustomerConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerConsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
