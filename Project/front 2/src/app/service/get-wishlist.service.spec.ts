import { TestBed } from '@angular/core/testing';

import { GetWishlistService } from './get-wishlist.service';

describe('GetWishlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetWishlistService = TestBed.get(GetWishlistService);
    expect(service).toBeTruthy();
  });
});
