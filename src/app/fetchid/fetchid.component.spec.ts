import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchidComponent } from './fetchid.component';

describe('FetchidComponent', () => {
  let component: FetchidComponent;
  let fixture: ComponentFixture<FetchidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
