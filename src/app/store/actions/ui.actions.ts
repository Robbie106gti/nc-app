import { Action } from '@ngrx/store';

export const UI_UPDATE = '[UI] Update';
export const UI_RESET = '[UI] Reset';

export class UIupdate implements Action {
  readonly type = UI_UPDATE;
  constructor(public payload: any) {}
}
export class UIreset implements Action {
  readonly type = UI_RESET;
}

export type ActionsUI = UIupdate | UIreset;
