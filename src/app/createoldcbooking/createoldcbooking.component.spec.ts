import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoldcbookingComponent } from './createoldcbooking.component';

describe('CreateoldcbookingComponent', () => {
  let component: CreateoldcbookingComponent;
  let fixture: ComponentFixture<CreateoldcbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoldcbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoldcbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
