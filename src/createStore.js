import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import logger from 'redux-logger';

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      form: reduxFormReducer
    }),
    applyMiddleware(
      logger
    )
  );
}