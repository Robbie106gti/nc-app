import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions) {}
}
