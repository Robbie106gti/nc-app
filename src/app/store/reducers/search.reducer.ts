import * as fromSearch from '../actions/search.actions';

export interface SearchState {
  results: [];
  query: { value: string; category: string };
  loaded: boolean;
  loading: boolean;
}

export const initialState: SearchState = {
  results: [],
  query: { value: null, category: null },
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromSearch.ActionsSearch
): SearchState {
  switch (action.type) {
    case fromSearch.SEARCH: {
      const query = action.payload;
      return {
        ...state,
        loading: true,
        query
      };
    }

    case fromSearch.SEARCH_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        results
      };
    }

    case fromSearch.SEARCH_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    default:
      return state;
  }
}
