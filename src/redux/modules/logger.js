export default function logger(state = {}, action = {}) {
  console.log(action, state);
  return state;
}
