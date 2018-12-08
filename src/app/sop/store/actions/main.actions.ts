import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_MAIN_SOPS = '[SOP] Load SOP main catagories';

export class LoadMain implements Action {
  readonly type = LOAD_MAIN_SOPS;
  constructor(public payload: any) {}
}

// action types
export type ActionsMain = LoadMain;
