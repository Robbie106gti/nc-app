import { Action } from '@ngrx/store';

export const GET_USER = '[User] Get from cookie';
export const LOGIN_SUCCESS = '[User] Login success';
export const LOGIN_FAIL = '[User] Login failed';
export const LOGOUT = '[User] Logout user';
export const SET_USER_ENTRYPOINT = '[User] Entrypoint';
export const SET_USER_REDIRECT = '[User] Redirect';
export const DO_NOTHING = '[User] Do nothing';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(
    public payload: { class: string; username: string; email: string }
  ) {}
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
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
export class Nothing implements Action {
  readonly type = DO_NOTHING;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export type ActionsUser =
  | GetUser
  | SetEntrypoint
  | SetRedirect
  | Nothing
  | LoginSuccess
  | LoginFail
  | Logout;
