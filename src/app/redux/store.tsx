/* eslint-disable import/no-extraneous-dependencies */
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducers from './rootReducer';

const INITIAL_STATE = {};

const middlewares = [thunk];

const devStore = createStore(
  rootReducers,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

const store = createStore(rootReducers, INITIAL_STATE, applyMiddleware(...middlewares));

const exportedStore = process.env.NODE_ENV === 'development' ? devStore : store;

export default exportedStore;
