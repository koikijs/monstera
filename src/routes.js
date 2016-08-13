import React from 'react';
import {Route} from 'react-router';
import uris from './uris';
import required from 'helpers/required';
import {load, isLoaded} from 'redux/modules/auth';

import {
    App,
    Event,
    NotFound,
  } from 'containers';

export default store => {
  const login = required(store, load, isLoaded).login;

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route>
      <Route path="/" component={App} >
        <Route path={uris.events.event} component={Event} onEnter={login} />
        { /* Catch all route */ }
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
