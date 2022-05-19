import {combineReducers} from 'redux';
// import IStoreState from './StoreTypes';

//TODO: Add reducers type here
const rootReducers = combineReducers<any>({
  errors: '',
  movies: '',
});

export default rootReducers;
