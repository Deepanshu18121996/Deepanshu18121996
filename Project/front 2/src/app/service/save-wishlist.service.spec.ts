import { TestBed } from '@angular/core/testing';

import { SaveWishlistService } from './save-wishlist.service';

describe('SaveWishlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveWishlistService = TestBed.get(SaveWishlistService);
    expect(service).toBeTruthy();
  });
});
