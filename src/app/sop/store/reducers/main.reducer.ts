import * as fromMain from '../actions/main.actions';

export interface MainState {
  entities: Line;
  loaded: boolean;
  loading: boolean;
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
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMain.ActionsMain
): MainState {
  switch (action.type) {
    case fromMain.LOAD_MAIN_SOPS: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}
