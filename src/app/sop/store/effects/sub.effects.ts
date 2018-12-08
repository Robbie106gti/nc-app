import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromStore from '..';
import * as subActions from '../actions/sub.actions';

@Injectable()
export class SubEffects {
  constructor(
    private store: Store<fromStore.SopsState>,
    private actions$: Actions
  ) {}
}
