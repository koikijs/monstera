
const LOAD = 'suggest/LOAD';
const LOAD_SUCCESS = 'suggest/LOAD_SUCCESS';
const LOAD_FAIL = 'suggest/LOAD_FAIL';

const SELECT_PREV = 'suggest/SELECT_PREV';
const SELECT_NEXT = 'suggest/SELECT_NEXT';
const SELECT_INDEX = 'suggest/SELECT_INDEX';

const cache = {
  '': []
};

const initialState = {
  data: [],
  loaded: false,
  loading: false,
  index: 0,
  selected: undefined
};

export default function suggest(state = initialState, action = {}) {
  let index;
  console.log(state);
  switch (action.type) {
    case LOAD:
      return {
        ...state,
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
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => cache[query] ? new Promise(resolve=>resolve(cache[query])) : client.fetchJSON('https://api.github.com/search/users', 'GET', {
      q: query,
      page: 1,
      per_page: 5
    }).then((res) => {
      res.items = res.items.map(item => {
        const member = {
          name: item.login,
          icon: item.avatar_url + '&s=100'
        };
        return member;
      });
      cache[query] = res;
      return res;
    })
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
