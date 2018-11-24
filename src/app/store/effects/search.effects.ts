import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as searchActions from '../actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {
  constructor(
    private store: Store<fromStore.State>,
    private actions$: Actions
  ) {}

  @Effect()
  search$ = this.actions$.ofType(searchActions.SEARCH).pipe(
    switchMap(action => {
      return of(null);
    })
  );
}
