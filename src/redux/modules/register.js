const NAME = 'regiser/NAME';
const DATE = 'regiser/DATE';
const MEMBERS = 'regiser/MEMBERS';


const initialState = {
  name: true,
  date: false,
  members: false
};
export default function register(state = initialState, action = {}) {
  switch (action.type) {

    case NAME:
      return {
        ...state,
        name: true,
        date: false,
        members: false
      };
    case DATE:
      return {
        ...state,
        name: true,
        date: false,
        members: false
      };
    case MEMBERS:
      return {
        ...state,
        name: true,
        date: false,
        members: false
      };
    default:
      return state;
  }
}
