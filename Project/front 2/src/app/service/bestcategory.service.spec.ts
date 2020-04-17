import { TestBed } from '@angular/core/testing';

import { BestcategoryService } from './bestcategory.service';

describe('BestcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestcategoryService = TestBed.get(BestcategoryService);
    expect(service).toBeTruthy();
  });
});
