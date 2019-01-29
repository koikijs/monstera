import moment from 'moment';
import uris from '../../uris';

const LOAD = 'candidate/LOAD';
const LOAD_SUCCESS = 'candidate/LOAD_SUCCESS';
const LOAD_FAIL = 'candidate/LOAD_FAIL';

const SELECT = 'candidate/SELECT';
const SELECT_SUCCESS = 'candidate/SELECT_SUCCESS';
const SELECT_FAIL = 'candidate/SELECT_FAIL';

const UNSELECT = 'candidate/UNSELECT';
const UNSELECT_SUCCESS = 'candidate/UNSELECT_SUCCESS';
const UNSELECT_FAIL = 'candidate/UNSELECT_FAIL';


const initialState = {
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
        items: action.result.items
      };
    case LOAD_FAIL:
      return {
        ...state
      };
    case SELECT:
      return {
        ...state,
        items: state.items.concat(
          [ action.query ]
        )
      };
    case SELECT_SUCCESS:
      return {
        ...state,
        items: action.result.items
      };
    case SELECT_FAIL:
      return {
        ...state
      };
    case UNSELECT:
      return {
        ...state,
        items: state.items.filter(
          item => moment.utc(item.date).isSame(moment.utc(action.query.date), 'date') ? false : true
        )
      };
    case UNSELECT_SUCCESS:
      return {
        ...state,
        items: action.result.items
      };
    case UNSELECT_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function load( query ) {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: client =>
      client.fetchJSON('https://chaus.now.sh' + uris.apis.candidates, 'GET', Object.assign(query, {
        limit: 1000,
      }))
  };
}

export function select( query ) {
  return {
    query,
    types: [ SELECT, SELECT_SUCCESS, SELECT_FAIL ],
    promise: client =>
      client
        .fetchJSON('https://chaus.now.sh' + uris.apis.candidates, 'POST', query)
        .then(
          () => load({
            event: query.event,
            user: query.user
          }).promise(client)
        )
  };
}

export function unselect( query ) {
  return {
    query,
    types: [ UNSELECT, UNSELECT_SUCCESS, UNSELECT_FAIL ],
    promise: client =>
      client
        .fetchJSON('https://chaus.now.sh' + uris.apis.candidates, 'DELETE', query)
        .then(
          () => load({
            event: query.event,
            user: query.user
          }).promise(client)
        )
  };
}
