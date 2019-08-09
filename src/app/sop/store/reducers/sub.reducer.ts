import * as fromSub from '../actions/sub.actions';
import { Line } from './main.reducer';
import { makeSubEntities } from 'src/app/common/entities';

export interface SubState {
  entities: Line;
  load: any[];
  loaded: any[];
}

export const initialState: SubState = {
  entities: {},
  load: [],
  loaded: []
};

export function reducer(
  state = initialState,
  action: fromSub.ActionsSub
): SubState {
  switch (action.type) {
    case fromSub.LOAD_SUB_SOPS: {
      const sop: any = action.payload;
      const load = [...state.load.filter(item => !sop.link), sop.link];
      return {
        ...state,
        load
      };
    }

    case fromSub.LOAD_SUB_SOPS_SUCCESS: {
      // console.log(action.payload)
      const cat = action.payload.sop;
      state.entities[cat.link] = makeSubEntities(action.payload.items);
      const loaded = [...state.loaded.filter(item => !cat.link), cat.link];
      return {
        ...state,
        loaded
      };
    }

    default: {
      return state;
    }
  }
}
