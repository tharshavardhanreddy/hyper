import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedbookingComponent } from './detailedbooking.component';

describe('DetailedbookingComponent', () => {
  let component: DetailedbookingComponent;
  let fixture: ComponentFixture<DetailedbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
