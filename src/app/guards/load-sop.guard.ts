import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { tap, filter, switchMap, catchError, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class LoadSopGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getSearchLoaded).pipe(
      skipWhile(sop => !sop),
      tap(sop => {
        // console.log(sop);
        /* if (!sop.loaded) {
          this.store.dispatch({ type: fromStore.LOAD_SOPS, payload: sop });
        } */
      }),
      filter(sop => sop)
    );
  }
}
