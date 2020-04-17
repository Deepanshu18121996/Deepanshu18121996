import { TestBed } from '@angular/core/testing';

import { SaveCartService } from './save-cart.service';

describe('SaveCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveCartService = TestBed.get(SaveCartService);
    expect(service).toBeTruthy();
  });
});
