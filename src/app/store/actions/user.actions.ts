import { Action } from '@ngrx/store';
import { Login } from 'src/app/models/login';
import { WQUser, User } from 'src/app/models/user';
import { setCookie } from 'src/app/common';

export const GET_USER_COOKIE = '[User] Get from cookie';
export const GET_USER = '[User] Get user';
export const LOGINWQ = '[User] Login user (Webquoin)';
export const LOGIN_SUCCESS = '[User] Login success';
export const LOGIN_FAIL = '[User] Login failed';
export const LOGIN_WRONG = '[User] Login credentionals do NOT match';
export const LOGOUT = '[User] Logout user';
export const SET_USER_ENTRYPOINT = '[User] Entrypoint';
export const SET_USER_REDIRECT = '[User] Redirect';

export class GetUserCookie implements Action {
  readonly type = GET_USER_COOKIE;
  constructor(
    public payload: { class: string; username: string; email: string }
  ) {}
}

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload: WQUser) {
    console.log(payload);
    const newuser = {
      username: payload.user.username,
      class: payload.user.class,
      email: payload.user.email
    };
    setCookie(newuser, 30);
  }
}

export class LoginWQ implements Action {
  readonly type = LOGINWQ;
  constructor(public payload: Login) {}
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}
export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}
export class LoginWrong implements Action {
  readonly type = LOGIN_WRONG;
  constructor(public payload: any) {}
}
export class SetEntrypoint implements Action {
  readonly type = SET_USER_ENTRYPOINT;
  constructor(public payload) {}
}
export class SetRedirect implements Action {
  readonly type = SET_USER_REDIRECT;
  constructor(public payload) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export type ActionsUser =
  | GetUser
  | LoginWQ
  | LoginWrong
  | GetUserCookie
  | SetEntrypoint
  | SetRedirect
  | LoginSuccess
  | LoginFail
  | Logout;
