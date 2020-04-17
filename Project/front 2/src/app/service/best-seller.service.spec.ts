import { TestBed } from '@angular/core/testing';

import { BestSellerService } from './best-seller.service';

describe('BestSellerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestSellerService = TestBed.get(BestSellerService);
    expect(service).toBeTruthy();
  });
});
