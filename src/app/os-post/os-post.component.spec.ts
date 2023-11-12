import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsPostComponent } from './os-post.component';

describe('OsPostComponent', () => {
  let component: OsPostComponent;
  let fixture: ComponentFixture<OsPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
