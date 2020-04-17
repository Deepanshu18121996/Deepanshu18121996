import { TestBed } from '@angular/core/testing';

import { RemoveWishService } from './remove-wish.service';

describe('RemoveWishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveWishService = TestBed.get(RemoveWishService);
    expect(service).toBeTruthy();
  });
});
