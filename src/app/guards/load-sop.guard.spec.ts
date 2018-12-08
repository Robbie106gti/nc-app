import { TestBed, async, inject } from '@angular/core/testing';

import { LoadSopGuard } from './load-sop.guard';

describe('LoadSopGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadSopGuard]
    });
  });

  it('should ...', inject([LoadSopGuard], (guard: LoadSopGuard) => {
    expect(guard).toBeTruthy();
  }));
});
