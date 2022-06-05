/* eslint-disable default-param-last */
import MovieActionTypes from '../actions/movies.actions.types';

const INITIAL_STATE = {
  movies: [],
  page: 1,
  totalPages: 0,
};

const movieReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case MovieActionTypes.MOVIES_LIST:
      return {
        ...state,
        movies: action.payload,
      };
    case MovieActionTypes.RESPONSE_PAGE:
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
      };
    case MovieActionTypes.LOAD_MORE_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    default:
      return state;
  }
};

export default movieReducer;
