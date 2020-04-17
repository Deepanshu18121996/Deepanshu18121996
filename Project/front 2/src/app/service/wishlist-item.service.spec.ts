import { TestBed } from '@angular/core/testing';

import { WishlistItemService } from './wishlist-item.service';

describe('WishlistItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WishlistItemService = TestBed.get(WishlistItemService);
    expect(service).toBeTruthy();
  });
});
