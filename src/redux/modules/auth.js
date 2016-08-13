import uris from '../../uris';
import config from '../../config';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const initialState = {
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        data: action.result
      };
    default:
      return state;
  }
}

export function isLoaded( globalState ) {
  return globalState &&
         globalState.auth &&
         globalState.auth.data &&
         globalState.auth.data.name ? true : false;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client
        .fetchJSON(config.global.protocol + '://' + config.global.host + (config.global.port ? ':' + config.global.port : '' ) + uris.apis.auth, 'GET')
  };
}
