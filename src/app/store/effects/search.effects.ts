import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromSopStore from '../../sop/store';
import * as searchActions from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {
  constructor(
    private store: Store<fromStore.State>,
    private sopStore: Store<fromSopStore.SopsState>,
    private actions$: Actions
  ) { }

  /*   @Effect({ dispatch: false })
    search$ = this.actions$.pipe(
      ofType(searchActions.SEARCH),
      switchMap((action: { type: string; payload: any }) => {
        console.log(action.payload);
        return of(null);
      })
    ); */

  /*   @Effect()
    search_sop$ = this.actions$.pipe(
      ofType(searchActions.SEARCH),
      switchMap((action: { type: string; payload: any }) => {
        return this.store.select(fromSopStore.getMainSopArray);
      }),
      map(search => new searchActions.SearchSuccess(search)),
      catchError(error => of(new searchActions.SearchFail(error)))
    ); */
}
