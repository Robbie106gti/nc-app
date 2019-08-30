import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { FirestoreService } from 'src/app/services';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { sortAlfabet } from 'src/app/common/sort';

import * as fromStore from '..';
import * as subActions from '../actions/sub.actions';
import * as mainActions from '../actions/main.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class SubEffects {
  constructor(
    private store: Store<fromStore.SopsState>,
    private actions$: Actions,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  @Effect()
  load_sub_sop$ = this.actions$.pipe(
    ofType(subActions.LOAD_SUB_SOPS),
    switchMap((action: any) => {
      return fetch('https://webquoin.com/catalog/api/public/index.php/sops/' + action.payload.link)
      .then(response =>  response.json())
      .then(res => new subActions.LoadSubSopsSuccess({sop: action.payload, items: res}))
      .catch(err => of(new subActions.LoadSubSopsFail(err)));
      /* return this.firestoreService.col$(`/sops/${action.payload.id}/entities`).pipe(
        map((sops: any) => new subActions.LoadSubSopsSuccess({sop: action.payload, items: sops})),
      catchError(err => of(new subActions.LoadSubSopsFail(err)))); */
    }
    ));

    @Effect()
    update_main_cat_load$ = this.actions$.pipe(
      ofType(subActions.LOAD_SUB_SOPS),
      map((action: any) => new mainActions.LoadEntitiesCategory(action.payload)),
      catchError(err => of(err))
      );

      @Effect()
      update_main_cat_loaded$ = this.actions$.pipe(
        ofType(subActions.LOAD_SUB_SOPS_SUCCESS),
        map((action: any) => new mainActions.LoadedEntitiesCategory(action.payload.sop)),
        catchError(err => of(err))
        );
}