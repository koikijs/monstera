import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import {reducer as form} from 'redux-form';
import register from './register';
import suggest from './suggest';
import member from './member';

import logger from './logger';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  register,
  suggest,
  member,
  logger,
});
