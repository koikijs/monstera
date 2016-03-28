import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {
    Register,
    RegisterName,
    RegisterDate,
    RegisterMember,
    NotFound,
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route>
      <Route path="/">
        <IndexRedirect to="/register/name" />
        <Route path="/register/" component={Register} >
          <Route path="name" component={RegisterName} />
          <Route path="date" component={RegisterDate} />
          <Route path="member" component={RegisterMember} />
        </Route>
        { /* Catch all route */ }
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
