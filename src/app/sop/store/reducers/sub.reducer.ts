import * as fromSub from '../actions/sub.actions';
import * as common from '../../../common/link';
import { Line } from './main.reducer';
import { sortAlfabet } from 'src/app/common/sort';

export interface SubState {
  entities: Line;
  load: any[];
  loaded: boolean;
}

export const initialState: SubState = {
  entities: {
    sop: {
      image: '../assets/images/underconstruction.png',
      title: 'Sub Sopies',
      link: 'linky'
    }
  },
  load: [],
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromSub.ActionsSub
): SubState {
  switch (action.type) {
    case fromSub.LOAD_SUB_SOPS: {
      const load = [...state.load, action.payload.id];
      return {
        ...state,
        load
      };
    }

    case fromSub.LOAD_SUB_SOPS_SUCCESS: {
      const items = sortAlfabet(action.payload);
      let entity = {};
      items.map(item => {
        entity = {
          ...entity,
          [common.makelink(item.title)]: {
            ...item,
            link: common.makelink(item.title)
          }
        };
      });
      return {
        ...state,
        entities: { ...state.entities, [entity[0].cat]: entity }
      };
    }

    default: {
      return state;
    }
  }
}
