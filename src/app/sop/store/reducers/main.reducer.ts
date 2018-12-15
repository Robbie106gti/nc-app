import * as fromMain from '../actions/main.actions';
import { makeEntities } from '../../../common/entities';

export interface MainState {
  entities: Line;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export interface Line {
  [id: string]: { [id: string]: any };
}

export const initialState: MainState = {
  entities: {
    sop: {
      image: '../assets/images/underconstruction.png',
      title: 'Main Sopies',
      link: 'linky'
    }
  },
  loaded: false,
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromMain.ActionsMain
): MainState {
  switch (action.type) {
    case fromMain.LOAD_MAIN_SOPS: {
      return { ...state, loading: true };
    }
    case fromMain.LOADED_MAIN_SOPS: {
      state.entities = makeEntities(action.payload, state);
      return { ...state, loading: false, loaded: true };
    }
    case fromMain.LOAD_FAIL_MAIN_SOPS: {
      const error = action.payload;
      return { ...initialState, loading: false, loaded: false, error };
    }

    default:
      return state;
  }
}
