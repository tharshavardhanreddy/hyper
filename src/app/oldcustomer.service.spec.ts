import { TestBed } from '@angular/core/testing';

import { OldcustomerService } from './oldcustomer.service';

describe('OldcustomerService', () => {
  let service: OldcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
