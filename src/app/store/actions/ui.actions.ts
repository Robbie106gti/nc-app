import { Action } from '@ngrx/store';

export const UI_UPDATE = '[UI] Update';

export class UIupdate implements Action {
  readonly type = UI_UPDATE;
}

export type ActionsUI = UIupdate;
