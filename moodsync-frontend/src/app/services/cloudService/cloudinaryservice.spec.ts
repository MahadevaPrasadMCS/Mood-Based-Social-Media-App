import { TestBed } from '@angular/core/testing';

import { Cloudinaryservice } from './cloudinaryservice';

describe('Cloudinaryservice', () => {
  let service: Cloudinaryservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cloudinaryservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
