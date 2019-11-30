import { makeActionCreator, createReducer } from 'utils/redux-utils';
import { getMovie, getTrailers } from 'api/movie';

export interface DetailState {
  success: boolean;
  error: boolean | any;
  loading: boolean;
  movie: any;
  trailers: any[];
}

export const Types = {
  LOADING: 'detail/LOADING',
  SUCCESS: 'detail/SUCCESS',
  ERROR: 'detail/ERROR',
  UPDATE: 'detail/UPDATE',
  TRAILERS: 'detail/TRAILERS',
};

export const Creators = {
  loading: makeActionCreator(Types.LOADING),
  searchSuccess: makeActionCreator(Types.SUCCESS),
  searchError: makeActionCreator(Types.ERROR, 'error'),
  updateMovie: makeActionCreator(Types.UPDATE, 'data'),
  updateTrailers: makeActionCreator(Types.TRAILERS, 'data'),
};

const initialState: DetailState = {
  success: false,
  error: null,
  loading: false,
  movie: {},
  trailers: [],
};

export function getDetail(id: number) {
  return dispatch => {
    dispatch(Creators.loading());
    return getMovie(id)
      .then(response => {
        if (response.hasOwnProperty('data')) {
          dispatch(Creators.updateMovie(response.data));
          dispatch(Creators.searchSuccess());
        }
      })
      .catch(error => {
        dispatch(Creators.searchError(error));
      });
  };
}

export function getVideos(id: number) {
  return dispatch => {
    dispatch(Creators.loading());
    return getTrailers(id)
      .then(response => {
        if (response.hasOwnProperty('data')) {
          dispatch(Creators.updateTrailers(response.data.results));
          dispatch(Creators.searchSuccess());
        }
      })
      .catch(error => {
        dispatch(Creators.searchError(error));
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
  movie: action.data,
});

const updateTrailers = (state = initialState, action) => ({
  ...state,
  trailers: action.data,
});

export default createReducer(initialState, {
  [Types.LOADING]: loading,
  [Types.SUCCESS]: searchSuccess,
  [Types.ERROR]: searchError,
  [Types.UPDATE]: updateResults,
  [Types.TRAILERS]: updateTrailers,
});
