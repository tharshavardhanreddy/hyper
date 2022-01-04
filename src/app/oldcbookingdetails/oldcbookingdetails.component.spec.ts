import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcbookingdetailsComponent } from './oldcbookingdetails.component';

describe('OldcbookingdetailsComponent', () => {
  let component: OldcbookingdetailsComponent;
  let fixture: ComponentFixture<OldcbookingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldcbookingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcbookingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
