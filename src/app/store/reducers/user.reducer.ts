import * as fromUser from '../actions/user.actions';
import { User, Favorites, Notes } from '../../models/user';

export interface UserState {
  data: User;
  loaded: boolean;
  loading: boolean;
  enterypoint: string;
  redirect: string;
  firestore: boolean;
  favorites: Favorites[];
  notes: Notes[];
  fails: number;
  cookie: boolean;
  status?: string;
  users?: any;
  loginerror?: string;
}

export const initialState: UserState = {
  data: {
    class: 'Guest',
    firstName: 'Guest',
    lastName: 'mode',
    username: '',
    email: '',
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
  redirect: '',
  firestore: false,
  loading: false,
  cookie: false,
  favorites: new Array(),
  notes: new Array(),
  fails: 0,
  loginerror: ''
};

export function reducer(
  state = initialState,
  action: fromUser.ActionsUser
): UserState {
  switch (action.type) {
    case fromUser.GET_USER_COOKIE: {
      const nickels = action.payload.class;
      const username = action.payload.username;
      const email = action.payload.email;
      return {
        ...state,
        data: {
          class: nickels,
          username,
          email,
          firstName: 'Robert',
          lastName: 'Leeuwerink'
        },
        loading: true,
        cookie: true
      };
    }
    case fromUser.GET_USER: {
      const data = action.payload.user;
      return { ...state, data, loaded: true };
    }
    case fromUser.LOGINWQ: {
      return {
        ...state,
        data: { username: action.payload.username },
        loading: true
      };
    }
    case fromUser.LOGIN_WRONG: {
      const fails = state.fails + 1;
      const loginerror = action.payload;
      return { ...state, fails, loginerror };
    }
    case fromUser.LOGIN_SUCCESS: {
      const data = action.payload;
      return { ...state, data, loaded: true, loading: false, firestore: true };
    }
    case fromUser.LOGIN_FAIL: {
      return initialState;
    }
    case fromUser.LOGOUT: {
      return initialState;
    }
    case fromUser.SET_USER_ENTRYPOINT: {
      const enterypoint = action.payload;
      return { ...state, enterypoint };
    }
    case fromUser.SET_USER_REDIRECT: {
      const redirect = action.payload;
      return { ...state, redirect };
    }

    default:
      return state;
  }
}
