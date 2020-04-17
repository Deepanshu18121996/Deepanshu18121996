import { TestBed } from '@angular/core/testing';

import { AddnotescatService } from './addnotescat.service';

describe('AddnotescatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddnotescatService = TestBed.get(AddnotescatService);
    expect(service).toBeTruthy();
  });
});
