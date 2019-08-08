import { TestBed } from '@angular/core/testing';

import { MatingService } from './mating.service';

describe('MatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatingService = TestBed.get(MatingService);
    expect(service).toBeTruthy();
  });
});
