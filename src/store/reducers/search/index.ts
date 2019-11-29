import { makeActionCreator, createReducer } from 'utils/redux-utils';
import { search } from 'api/search';

export interface SearchState {
  success: boolean;
  error: boolean | any;
  loading: boolean;
  movies: any[];
}

export const Types = {
  LOADING: 'search/LOADING',
  SUCCESS: 'search/SUCCESS',
  ERROR: 'search/ERROR',
  UPDATE: 'search/UPDATE',
};

export const Creators = {
  loading: makeActionCreator(Types.LOADING),
  searchSuccess: makeActionCreator(Types.SUCCESS),
  searchError: makeActionCreator(Types.ERROR, 'error'),
  updateResults: makeActionCreator(Types.UPDATE, 'data'),
};

const initialState: SearchState = {
  success: false,
  error: null,
  loading: false,
  movies: [],
};

export function searchByName(name: string) {
  return dispatch => {
    dispatch(Creators.loading());
    return search(name)
      .then(response => {
        if (response.data.hasOwnProperty('results')) {
          dispatch(Creators.updateResults(response.data.results));
          dispatch(Creators.searchSuccess());
        }
      })
      .catch(error => {
        dispatch(Creators.searchError(error));
        // TODO: Mostrar toast com erro
      });
  };
}

const loading = (state = initialState, action) => ({
  ...state,
  loading: true,
});

const searchSuccess = (state = initialState, action) => ({
  ...state,
  success: true,
  loading: false,
  error: null,
});

const searchError = (state = initialState, action) => ({
  ...state,
  success: false,
  error: action.error,
  loading: false,
});

const updateResults = (state = initialState, action) => ({
  ...state,
  movies: action.data,
});

export default createReducer(initialState, {
  [Types.LOADING]: loading,
  [Types.SUCCESS]: searchSuccess,
  [Types.ERROR]: searchError,
  [Types.UPDATE]: updateResults,
});
