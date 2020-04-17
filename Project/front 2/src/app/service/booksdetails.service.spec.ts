import { TestBed } from '@angular/core/testing';

import { BooksdetailsService } from './booksdetails.service';

describe('BooksdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksdetailsService = TestBed.get(BooksdetailsService);
    expect(service).toBeTruthy();
  });
});
