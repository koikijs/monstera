
const SET = 'breadcrumb/SET';
const CLEAR = 'breadcrumb/CLEAR';
const initialState = {
  items: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        items: action.breadcrumbs
      };
    case CLEAR:
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
}

export function set(breadcrumbs) {
  return {
    type: SET,
    breadcrumbs
  };
}
