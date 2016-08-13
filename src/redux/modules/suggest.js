import uris from '../../uris';

const CLEAR = 'suggest/CLEAR';

const LOAD = 'suggest/LOAD';
const LOAD_SUCCESS = 'suggest/LOAD_SUCCESS';
const LOAD_FAIL = 'suggest/LOAD_FAIL';

const SELECT_PREV = 'suggest/SELECT_PREV';
const SELECT_NEXT = 'suggest/SELECT_NEXT';
const SELECT_INDEX = 'suggest/SELECT_INDEX';

const cache = {};

const initialState = {
  data: [],
  loaded: false,
  loading: false,
  index: 0,
  selected: undefined
};

export default function reducer(state = initialState, action = {}) {
  let index;
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        query: '',
        data: []
      };
    case LOAD:
      return {
        ...state,
        query: action.query,
        loading: true,
        loaded: false,
        saveSuccess: false
      };
    case LOAD_SUCCESS:
      const data = action.result.items || [];
      return {
        ...state,
        loading: false,
        loaded: true,
        data: data,
        index: 0,
        selected: data.length ? data[0].name : undefined,
        error: undefined,
        saveSuccess: false
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        saveSuccess: false
      };
    case SELECT_PREV:
      index = state.index > 0 ? state.index - 1 : 0;
      return {
        ...state,
        index,
        selected: state.data[index].name
      };
    case SELECT_NEXT:
      index = state.index < state.data.length - 1 ? state.index + 1 : state.data.length - 1;
      return {
        ...state,
        index,
        selected: state.data[index].name
      };
    case SELECT_INDEX:
      index = action.index;
      return {
        ...state,
        index,
        selected: state.data[index].name
      };
    default:
      return state;
  }
}

export function load(query) {
  return {
    query,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) =>
      cache[query] ?
        new Promise(resolve=>resolve(cache[query])) :
        client.fetchJSON('https://chaus.herokuapp.com' + uris.apis.users, 'GET', {
          name: '*' + query + '*',
          limit: 5
        }).then((res) => {
          res.items = res.items.map(item => {
            const member = {
              name: item.name,
              icon: item.icon + '&s=100'
            };
            return member;
          });
          cache[query] = res;
          return res;
        })
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

export function prev() {
  return {
    type: SELECT_PREV
  };
}

export function next() {
  return {
    type: SELECT_NEXT
  };
}

export function set(index) {
  return {
    type: SELECT_INDEX,
    index
  };
}
