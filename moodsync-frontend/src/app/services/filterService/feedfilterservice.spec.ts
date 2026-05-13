import { TestBed } from '@angular/core/testing';

import { Feedfilterservice } from './feedfilterservice';

describe('Feedfilterservice', () => {
  let service: Feedfilterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feedfilterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
