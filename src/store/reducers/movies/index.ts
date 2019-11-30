import { makeActionCreator, createReducer } from 'utils/redux-utils';
import { search, searchByGenre } from 'api/search';

export interface SearchState {
  success: boolean;
  error: boolean | any;
  loading: boolean;
  data: any[];
  total_pages?: number;
  total_results?: number;
  current_page?: number;
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
  data: [],
  current_page: 1,
  total_pages: 0,
  total_results: 0,
};

export function searchByName(name: string, page?: number) {
  return dispatch => {
    dispatch(Creators.loading());
    return search(name, page)
      .then(response => {
        if (response.data.hasOwnProperty('results')) {
          dispatch(Creators.updateResults(response.data));
          dispatch(Creators.searchSuccess());
        }
      })
      .catch(error => {
        dispatch(Creators.searchError(error));
        // TODO: Mostrar toast com erro
      });
  };
}

export function getMoviesByGenre(genreId: number, page?: number) {
  return dispatch => {
    dispatch(Creators.loading());
    return searchByGenre(genreId, page)
      .then(response => {
        if (response.data.hasOwnProperty('results')) {
          dispatch(Creators.updateResults(response.data));
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
  data: action.data.results,
  total_pages: action.data.total_pages,
  total_results: action.data.total_results,
});

export default createReducer(initialState, {
  [Types.LOADING]: loading,
  [Types.SUCCESS]: searchSuccess,
  [Types.ERROR]: searchError,
  [Types.UPDATE]: updateResults,
});
