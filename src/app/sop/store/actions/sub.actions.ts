import { Action } from '@ngrx/store';

// load Category SOP
export const LOAD_SUB_SOPS = '[SOP] Load sub category';
export const LOAD_SUB_SOPS_FAIL = '[SOP] Load sub category Fail';
export const LOAD_SUB_SOPS_SUCCESS = '[SOP] Load sub category Success';

export class LoadSubSops implements Action {
  readonly type = LOAD_SUB_SOPS;
  constructor(public payload: any) {}
}

export class LoadSubSopsFail implements Action {
  readonly type = LOAD_SUB_SOPS_FAIL;
  constructor(public payload: any) {}
}

export class LoadSubSopsSuccess implements Action {
  readonly type = LOAD_SUB_SOPS_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type ActionsSub = LoadSubSops | LoadSubSopsFail | LoadSubSopsSuccess;
