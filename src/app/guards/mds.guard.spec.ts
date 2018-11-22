import { TestBed, async, inject } from '@angular/core/testing';

import { MdsGuard } from './mds.guard';

describe('MdsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdsGuard]
    });
  });

  it('should ...', inject([MdsGuard], (guard: MdsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
