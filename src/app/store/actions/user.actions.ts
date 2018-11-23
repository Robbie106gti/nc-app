import { Action } from '@ngrx/store';

export const GET_USER = '[User] Get';

export class GetUser implements Action {
  readonly type = GET_USER;
}

export type ActionsUser = GetUser;
