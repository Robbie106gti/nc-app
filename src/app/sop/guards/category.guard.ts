import { Injectable } from '@angular/core';
import { 
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { tap, filter, switchMap, catchError, skipWhile, map } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {
  constructor(private store: Store<fromStore.SopsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(sop => {
        console.log(sop)
        if (sop.loaded) {
          return true;
        } else {
          this.store.dispatch({ type: fromStore.LOAD_SUB_SOPS, payload: sop });
          return true;
        }
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<any> {
    return this.store.select(fromStore.getMainSopCat);
  }
}
