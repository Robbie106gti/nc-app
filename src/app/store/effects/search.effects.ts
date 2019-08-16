import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

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

  @Effect({dispatch: false})
  search$ = this.actions$.pipe(
    ofType(searchActions.SEARCH),
    switchMap((action: { type: string; payload: any }) => {
      console.log(action.payload);
      return of(null);
    })
  );
}
