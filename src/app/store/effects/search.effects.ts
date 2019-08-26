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

  @Effect()
  search$ = this.actions$.pipe(
    ofType(searchActions.SEARCH),
    switchMap(async (action: { type: string; payload: any }) => {
      const results = await searchWebquoin(action.payload);
      return new searchActions.SearchSuccess(results);
    }),
    catchError(error => of(new searchActions.SearchFail(error)))
  );

}

async function searchWebquoin(query) {
  const results = await fetch('https://webquoin.com/catalog/api/public/index.php/search/' + query);
  const data = await results.json();
  console.log(data);
  return data;
}
