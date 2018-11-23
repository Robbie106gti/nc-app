import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions) {}
}
