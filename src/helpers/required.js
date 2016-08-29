import cookie from 'react-cookie';

export default (store, load, isLoaded, res) => {
  return {
    login: (nextState, replace, cb) => {
      function checkAuth() {
        const { auth: { data: {name} }} = store.getState();
        if (!name) {
          // oops, not logged in, so can't be here!
          replace('/auth/github');
        }
        cb();
      }

      if (!isLoaded(store.getState())) {
        store.dispatch(load()).then(
          checkAuth,
          () => {
            if ( res ) {
              res.cookie('redirect', nextState.location.pathname);
            } else {
              cookie.save('redirect', nextState.location.pathname);
            }
            replace('/auth/github');
            cb();
          }
        );
      } else {
        checkAuth();
      }
    }
  };
};
