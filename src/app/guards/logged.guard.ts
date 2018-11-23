import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(logged_in => {
        if (logged_in === true) {
          this.router.navigate(['dashboard', 'profile']);
        }
        return logged_in;
      }),
      catchError(() => of(true))
    );
  }

  checkStore(): Observable<boolean> {
    // this.store.dispatch({ type: fromStore.ENTERY_POINT, payload: this.route.url });
    return this.store.select(fromStore.getUserLoggedin);
  }
}
