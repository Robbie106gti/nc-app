import { TestBed, async, inject } from '@angular/core/testing';

import { SopGuard } from './sop.guard';

describe('SopGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SopGuard]
    });
  });

  it('should ...', inject([SopGuard], (guard: SopGuard) => {
    expect(guard).toBeTruthy();
  }));
});
