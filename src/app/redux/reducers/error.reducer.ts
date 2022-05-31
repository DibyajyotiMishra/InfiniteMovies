/* eslint-disable default-param-last */
import MovieActionTypes from '../actions/movies.actions.types';

const INITIAL_STATE = {
  error: null,
};

const errorReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case MovieActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
