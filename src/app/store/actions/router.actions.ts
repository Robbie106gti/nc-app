import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const START = '[Router] NavigationStart';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const CANCEL = '[Router] Cancel extras';
export const CANCEL_ROUTE = '[Router] CAnceled routed';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}
export class Start implements Action {
  readonly type = GO;
  constructor(public payload) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class Cancel implements Action {
  readonly type = CANCEL;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class CancelRouter implements Action {
  readonly type = CANCEL_ROUTE;
  constructor(public payload) {}
}

export type ActionsRouter = Go | Start | Back | Forward | Cancel | CancelRouter;
