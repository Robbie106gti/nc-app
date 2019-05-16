import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as fromStore from '../store';
import * as mainActions from '../catalog/store/actions/';

@Injectable({
  providedIn: 'root'
})
export class CatalogGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(logged_in => {
        if (logged_in === false) {
          this.router.navigate(['home']);
          return logged_in;
        } else {
          this.store.dispatch({ type: mainActions.LOAD_MAIN_CATALOG });
          return logged_in;
        }
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    // this.store.dispatch({ type: fromStore.ENTERY_POINT, payload: this.route.url });
    return of(true);
  }
  
}
