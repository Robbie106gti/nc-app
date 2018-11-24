import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as routerActions from '../actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(routerActions.GO).pipe(
    map((action: routerActions.Go) => {
      // console.log(action);
      return action.payload;
    }),
    tap(({ path, query: queryParams, extras }) => {
      // console.log(path);
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(routerActions.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(routerActions.FORWARD)
    .pipe(tap(() => this.location.forward()));

  @Effect({ dispatch: false })
  navigator$ = this.actions$.ofType(routerActions.CANCEL).pipe(
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      // console.log(path, { queryParams, ...extras });
    })
  );
}
