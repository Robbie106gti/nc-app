import { Action } from '@ngrx/store';
import { User, Favorites, Notes } from '../../models/user';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
  enterypoint: string;
  firestore: boolean;
  favorites: Favorites[];
  notes: Notes[];
  fails: number;
  status?: string;
  users?: any;
}

export const initialState: UserState = {
  data: {
    class: 'Guest',
    firstName: 'Guest',
    lastName: 'mode',
    roles: {
      admin: false,
      dealer: false,
      editor: false,
      nickels: false,
      reader: false,
      sop: false,
      mds: false
    }
  },
  loaded: false,
  enterypoint: '',
  firestore: false,
  loading: false,
  favorites: new Array(),
  notes: new Array(),
  fails: -1
};

export function reducer(state = initialState, action: Action): User {
  switch (action.type) {
    default:
      return state;
  }
}
