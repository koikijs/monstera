import __ from 'lodash';
const ADD = 'member/ADD';
const ADD_SUCCESS = 'member/ADD_SUCCESS';
const ADD_FAIL = 'member/ADD_FAIL';

const initialState = {
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD:
      return {
        ...state
      };
    case ADD_SUCCESS:
      return {
        ...state,
        data: __.find(state.data, { name: action.result.name }) ? state.data
                                                                : state.data.concat([action.result])
      };
    case ADD_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function add(_member) {
  return {
    types: [ ADD, ADD_SUCCESS, ADD_FAIL ],
    promise: client =>
      client.fetchJSON('https://chaus.herokuapp.com/apis/monstera/users/' + encodeURIComponent(_member), 'GET')
  };
}
