import {combineReducers} from 'redux';
import errorReducer from './reducers/error.reducer';
import movieReducer from './reducers/movie.reducer';

const rootReducers = combineReducers<any>({
  errors: errorReducer,
  movies: movieReducer,
});

export default rootReducers;
