import uris from '../../uris';

const LOAD = 'orgs/LOAD';
const LOAD_SUCCESS = 'orgs/LOAD_SUCCESS';
const LOAD_FAIL = 'orgs/LOAD_FAIL';

const initialState = {
  item: {},
  items: []
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
        item: action.result
      };
    default:
      return state;
  }
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client
        .fetchJSON('https://api.github.com' + uris.normalize( uris.apis.org, {id}), 'GET')
  };
}
