import * as fromSearch from '../actions/search.actions';

export interface SearchState {
  results: { [id: string]: any };
  query: { value: string; category: string };
  loaded: boolean;
  loading: boolean;
}

export const initialState: SearchState = {
  results: {},
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
      const search = action.payload;
      console.log(state);
      const query = state.query;
      // tslint:disable-next-line:no-inferrable-types
      let max: number = 10;
      const results = new Array();
      search.forEach(el => {
        const str = el.code + el.title + el.content;
        // tslint:disable-next-line:triple-equals
        if (max == 0) {
          return;
        }
        if (str.toLowerCase().includes(query.value.toLowerCase())) {
          results.push(el);
          max--;
        }
      });

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
