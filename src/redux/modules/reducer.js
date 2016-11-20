import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import {reducer as form} from 'redux-form';
import register from './register';
import suggest from './suggest';
import member from './member';
import auth from './auth';
import candidate from './candidate';
import holiday from './holiday';
import org from './org';
import breadcrumb from './breadcrumb';

import logger from './logger';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  register,
  auth,
  suggest,
  member,
  candidate,
  holiday,
  org,
  breadcrumb,
  logger,
});
