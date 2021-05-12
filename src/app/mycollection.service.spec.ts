import { TestBed } from '@angular/core/testing';

import { MycollectionService } from './mycollection.service';

describe('MycollectionService', () => {
  let service: MycollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
