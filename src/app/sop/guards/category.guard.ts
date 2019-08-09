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
        if (sop.loading === false && sop.loaded === false) {
        this.store.dispatch({ type: fromStore.LOAD_SUB_SOPS, payload: sop });
      }
        return sop.loaded;
      }),
      skipWhile(loaded => loaded === false),
      map(loaded => loaded),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<any> {
    return this.store.select(fromStore.getMainSopCat);
  }
}
