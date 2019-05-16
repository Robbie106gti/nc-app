import { Action } from '@ngrx/store';

// load Category CATALOG
export const LOAD_SUB_CATALOG = '[CATALOG] Load sub category';
export const LOAD_SUB_CATALOG_FAIL = '[CATALOG] Load sub category Fail';
export const LOAD_SUB_CATALOG_SUCCESS = '[CATALOG] Load sub category Success';

export class LoadSubCatalog implements Action {
  readonly type = LOAD_SUB_CATALOG;
  constructor(public payload: any) {}
}

export class LoadSubCatalogFail implements Action {
  readonly type = LOAD_SUB_CATALOG_FAIL;
  constructor(public payload: any) {}
}

export class LoadSubCatalogSuccess implements Action {
  readonly type = LOAD_SUB_CATALOG_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type ActionsSub = LoadSubCatalog | LoadSubCatalogFail | LoadSubCatalogSuccess;
