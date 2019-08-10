import { TestBed } from '@angular/core/testing';

import { EggsService } from './eggs.service';

describe('EggsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EggsService = TestBed.get(EggsService);
    expect(service).toBeTruthy();
  });
});
