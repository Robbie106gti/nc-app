import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import * as uiActions from '../actions/ui.actions';
import { parseCookie, resetCookie, Cookie } from '../../common/cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  switchMap,
  map,
  takeWhile,
  catchError,
  skipWhile
} from 'rxjs/operators';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Login } from 'src/app/models/login';
import { WQUser } from 'src/app/models/user';
@Injectable()
export class UserEffects {
  endpoint =
    'https://us-central1-nickels-catalog.cloudfunctions.net/auth-login';
  // endpoint = 'http://localhost:5000/nickels-catalog/us-central1/auth-login';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) {}

  @Effect()
  check_cookie$ = this.actions$.ofType(userActions.SET_USER_ENTRYPOINT).pipe(
    switchMap(() => parseCookie()),
    takeWhile(cookie => cookie !== null),
    map((cookie: { class: string; email: string; username: string }) => {
      // console.log(cookie);
      return new userActions.GetUserCookie(cookie);
    })
  );

  @Effect()
  get_user_cookie$ = this.actions$.ofType(userActions.GET_USER_COOKIE).pipe(
    map((cookie: { type: string; payload: Cookie }) => {
      this.http
        .post(this.endpoint, { ...cookie, cookie: true })
        .pipe(
          map(success => this.firestoreService.refreshCustomClaims(success))
        );
      return cookie;
    }),
    switchMap((cookie: { type: string; payload: Cookie }) => {
      // console.log(cookie);
      return this.firestoreService.doc$(`users/${cookie.payload.email}`).pipe(
        map(user => {
          // console.log(user);
          return new userActions.LoginSuccess(user);
        }),
        catchError(error => of(new userActions.LoginFail(error)))
      );
    })
  );

  @Effect()
  get_user$ = this.actions$.ofType(userActions.GET_USER).pipe(
    map((cookie: { type: string; payload: WQUser }) => {
      this.firestoreService.refreshCustomClaims(cookie.payload.token);
      return cookie;
    }),
    switchMap((cookie: { type: string; payload: WQUser }) => {
      // console.log(cookie);
      return this.firestoreService
        .doc$(`users/${cookie.payload.user.email}`)
        .pipe(
          map(user => {
            // console.log(user);
            return new userActions.LoginSuccess(user);
          }),
          catchError(error => of(new userActions.LoginFail(error)))
        );
    })
  );

  @Effect()
  loginWQ$ = this.actions$.ofType(userActions.LOGINWQ).pipe(
    skipWhile(
      (login: { type: string; payload: Login }) =>
        !login.payload.password && !login.payload.username
    ),
    switchMap((login: { type: string; payload: Login }) => {
      return this.http
        .post(this.endpoint, login.payload)
        .pipe(
          map((user: WQUser) =>
            user.valid.Error
              ? new userActions.LoginWrong(user.valid.Error)
              : new userActions.GetUser(user)
          )
        );
    }),
    catchError(err => of(new userActions.LoginFail(err)))
  );

  @Effect()
  loginWQ_nodata$ = this.actions$.ofType(userActions.LOGINWQ).pipe(
    skipWhile(
      (login: { type: string; payload: Login }) =>
        !!login.payload.password && !!login.payload.username
    ),
    map(() => {
      return new userActions.LoginWrong(
        'Please provide username and a password!'
      );
    })
  );

  @Effect()
  update_ui$ = this.actions$
    .ofType(userActions.GET_USER_COOKIE)
    .pipe(
      map(
        (cookie: {
          type: string;
          payload: { class: string; email: string; username: string };
        }) => new uiActions.UIupdateCK(cookie.payload)
      )
    );

  @Effect()
  update_ui_fb$ = this.actions$
    .ofType(userActions.LOGIN_SUCCESS)
    .pipe(
      map(
        (cookie: { type: string; payload: any }) =>
          new uiActions.UIupdateFB(cookie.payload)
      )
    );

  @Effect()
  reset_ui$ = this.actions$
    .ofType(userActions.LOGIN_FAIL, userActions.LOGIN_WRONG)
    .pipe(map(() => new uiActions.UIreset()));

  @Effect()
  logout_ui$ = this.actions$.ofType(userActions.LOGOUT).pipe(
    map(() => {
      resetCookie();
      return new uiActions.UIreset();
    })
  );
}
