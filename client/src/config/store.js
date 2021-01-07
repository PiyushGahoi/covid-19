import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';
import config from './config';

function configMiddleware() {
  const middleWares = config.debugMode ? applyMiddleware(thunkMiddleware, logger) : applyMiddleware(thunkMiddleware);
  return compose(middleWares);
}

const initialState = {};
const middleWares = configMiddleware();
const store = createStore(rootReducer, initialState, middleWares);

export default store;
