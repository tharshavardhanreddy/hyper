import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovetokenComponent } from './removetoken.component';

describe('RemovetokenComponent', () => {
  let component: RemovetokenComponent;
  let fixture: ComponentFixture<RemovetokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovetokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovetokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
