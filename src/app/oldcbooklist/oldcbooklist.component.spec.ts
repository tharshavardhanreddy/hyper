import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcbooklistComponent } from './oldcbooklist.component';

describe('OldcbooklistComponent', () => {
  let component: OldcbooklistComponent;
  let fixture: ComponentFixture<OldcbooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldcbooklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcbooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
