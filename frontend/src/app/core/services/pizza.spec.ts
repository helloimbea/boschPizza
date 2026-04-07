import { TestBed } from '@angular/core/testing';

import { Pizza } from './pizza';

describe('Pizza', () => {
  let service: Pizza;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pizza);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
