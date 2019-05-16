import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as routerActions from '../actions';
import { ROUTER_CANCEL, ROUTER_NAVIGATION } from '@ngrx/router-store';
import * as userActions from '../actions/user.actions';
import { map, tap, takeWhile } from 'rxjs/operators';
import { RouterCancel, RouterNav } from 'src/app/models/router';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(routerActions.GO),
    map((action: routerActions.Go) => {
      // console.log({ go: action });
      return action.payload;
    }),
    tap(({ path, query: queryParams, extras }) => {
      // console.log(path);
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .pipe(
      ofType(routerActions.BACK),
      tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .pipe(
      ofType(routerActions.FORWARD), tap(() => this.location.forward()));

  @Effect()
  entrypoint$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    takeWhile(
      (action: { type: string; payload: RouterNav }) =>
        action.payload.event.id === 1
    ),
    map(
      (action: { type: string; payload: RouterNav }) =>
        new userActions.SetEntrypoint(action.payload.event.url)
    )
  );

  @Effect()
  cancelled$ = this.actions$.pipe(
    ofType(ROUTER_CANCEL),
    takeWhile(
      (action: { type: string; payload: RouterCancel }) =>
        action.payload.event.id >= 1
    ),
    map(
      (action: { type: string; payload: RouterCancel }) =>
        new userActions.SetRedirect(action.payload.event.url)
    )
  );
}
