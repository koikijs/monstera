
const LOAD = 'suggest/LOAD';
const LOAD_SUCCESS = 'suggest/LOAD_SUCCESS';
const LOAD_FAIL = 'suggest/LOAD_FAIL';

const cache = {};

const initialState = {
  data: [],
  loaded: false,
  loading: false
};
export default function suggest(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        saveSuccess: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.items || [],
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
      cache[query] = res;
      return res;
    })
  };
}
