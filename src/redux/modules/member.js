
const ADD = 'member/ADD';

const initialState = {
  data: []
};

export default function member(state = initialState, action = {}) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        data: state.data.concat([action.member])
      };
    default:
      return state;
  }
}

export function add(_member) {
  return {
    type: ADD,
    member: _member
  };
}
