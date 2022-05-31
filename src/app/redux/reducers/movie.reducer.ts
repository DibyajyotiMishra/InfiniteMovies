/* eslint-disable default-param-last */
import MovieActionTypes from '../actions/movies.actions.types';

const INITIAL_STATE = {
  movies: [],
};

const movieReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case MovieActionTypes.MOVIES_LIST:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
