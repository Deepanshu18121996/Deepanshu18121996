import { TestBed } from '@angular/core/testing';

import { NotesdetailService } from './notesdetail.service';

describe('NotesdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesdetailService = TestBed.get(NotesdetailService);
    expect(service).toBeTruthy();
  });
});
