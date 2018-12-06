import { Action } from '@ngrx/store';

export const UI_CK_UPDATE = '[UI] Update from cookie';
export const UI_FB_UPDATE = '[UI] Update from firebase';
export const UI_RESET = '[UI] Reset';

export const UI_SECTION = '[UI] Section update';

export class UIupdateCK implements Action {
  readonly type = UI_CK_UPDATE;
  constructor(public payload: any) {}
}
export class UIupdateFB implements Action {
  readonly type = UI_FB_UPDATE;
  constructor(public payload: any) {}
}
export class UIsection implements Action {
  readonly type = UI_SECTION;
  constructor(public payload: any) {}
}
export class UIreset implements Action {
  readonly type = UI_RESET;
}

export type ActionsUI = UIupdateCK | UIupdateFB | UIreset | UIsection;
