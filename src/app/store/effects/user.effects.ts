import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import * as uiActions from '../actions/ui.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { base64Encode, base64Decode } from '@firebase/util';

import { switchMap, map, tap, takeWhile, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Res } from '../../models/login';
import { FirestoreService } from 'src/app/services/firestore.service';
@Injectable()
export class UserEffects {
  endpoint =
    'https://us-central1-nickels-catalog.cloudfunctions.net/auth-login';
  // endpoint = 'http://localhost:5000/nickels-catalog/us-central1/auth-login';
  res = new Observable<Res>();

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) {}

  @Effect()
  check_cookie$ = this.actions$.ofType(userActions.SET_USER_ENTRYPOINT).pipe(
    switchMap(() => this.parseCookie()),
    takeWhile(cookie => cookie !== null),
    map((cookie: { class: string; email: string; username: string }) => {
      console.log(cookie);
      return new userActions.GetUser(cookie);
    })
  );

  @Effect()
  get_user$ = this.actions$.ofType(userActions.GET_USER).pipe(
    switchMap(
      (cookie: {
        type: string;
        payload: { class: string; email: string; username: string };
      }) => {
        console.log(cookie);
        return this.firestoreService.doc$(`user/${cookie.payload.email}`).pipe(
          map(user => {
            console.log(user);
            return new userActions.LoginSuccess(user);
          })
        );
      }
    ),
    catchError(error => of(new userActions.LoginFail(error)))
  );

  @Effect()
  update_ui$ = this.actions$
    .ofType(userActions.GET_USER)
    .pipe(
      map(
        (cookie: {
          type: string;
          payload: { class: string; email: string; username: string };
        }) => new uiActions.UIupdate(cookie.payload)
      )
    );

  @Effect()
  reset_ui$ = this.actions$
    .ofType(userActions.LOGIN_FAIL)
    .pipe(map(() => new uiActions.UIreset()));

  @Effect()
  logout_ui$ = this.actions$
    .ofType(userActions.LOGOUT)
    .pipe(map(() => new uiActions.UIreset()));

  ///// Functions below this/////
  trimit(str) {
    return str ? str.trim() : null;
  }

  setCookie(data, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    const cookie = JSON.stringify({
      class: data.class,
      email: data.email,
      username: data.username
    });
    document.cookie =
      'nc-app=' + base64Encode(cookie) + ';' + expires + ';path=/';
  }

  getCookie(cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  parseCookie() {
    const ck = this.getCookie('nc-app');
    let cookie: Observable<Res>;
    if (ck === '' || ck === 'Thu, 01 Jan 1970 01: 00: 08 UTC') {
      return of((cookie = null));
    } else {
      cookie = JSON.parse(base64Decode(ck));
      // console.log(cookie);
      return of(cookie);
    }
  }
}
