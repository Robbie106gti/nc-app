import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, skipWhile } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromSopsState from '../sop/store/';

@Injectable({
  providedIn: 'root'
})
export class SopGuard implements CanActivateChild {
  constructor(private store: Store<fromStore.State>, private router: Router) {}
  canActivateChild(): Observable<boolean> {
    return this.checkStore().pipe(
      map(sops => {
        // console.log('load sops: ', sops)
        if (sops.loading === false && sops.loaded === false) {
          // console.log('load sops')
          this.store.dispatch({ type: fromSopsState.LOAD_MAIN_SOPS });
        }
        return sops.loaded;
      }),
      skipWhile(loaded => loaded === false),
      map(loaded => loaded),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<any> {
    // this.store.dispatch({ type: fromStore.ENTERY_POINT, payload: this.route.url });
    return this.store.select(fromSopsState.getMainSopsLoaded);
  }
}
