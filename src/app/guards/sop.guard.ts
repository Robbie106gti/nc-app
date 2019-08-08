import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromSopsState from '../sop/store/';

@Injectable({
  providedIn: 'root'
})
export class SopGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(loaded => {
        if (loaded === true) {
          return loaded;
        } else {
          // this.router.navigate(['/']);
          this.store.dispatch({ type: fromSopsState.LOAD_MAIN_SOPS });
          return true;
        }
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    // this.store.dispatch({ type: fromStore.ENTERY_POINT, payload: this.route.url });
    return this.store.select(fromSopsState.getMainSopsLoaded);
  }
}
