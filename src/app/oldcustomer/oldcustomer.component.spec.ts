import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcustomerComponent } from './oldcustomer.component';

describe('OldcustomerComponent', () => {
  let component: OldcustomerComponent;
  let fixture: ComponentFixture<OldcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
