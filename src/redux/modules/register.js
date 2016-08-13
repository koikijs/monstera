import uris from '../../uris';

const NAME = 'regiser/NAME';
const DATE = 'regiser/DATE';
const MEMBERS = 'regiser/MEMBERS';

const SAVE = 'regiser/SAVE';
const SAVE_SUCCESS = 'regiser/SAVE_SUCCESS';
const SAVE_FAIL = 'regiser/SAVE_FAIL';

const initialState = {
  name: true,
  date: false,
  members: false
};
export default function reducer(state = initialState, action = {}) {
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

export function save( values ) {
  return {
    types: [ SAVE, SAVE_SUCCESS, SAVE_FAIL ],
    promise: client =>
      client
        .fetchJSON('http://chaus.herokuapp.com' + uris.apis.events, 'POST', {
          name: values.event
        })
        .then(()=>
          client
            .fetchJSON('http://chaus.herokuapp.com' + uris.apis.events, 'GET', {
              name: values.event
            })
            .then((res)=>
              res.items[0]
            )
        )
        .then((event)=>{
          const promises = values.members.map((member)=>
            client
              .fetchJSON('http://chaus.herokuapp.com' + uris.apis.attendees, 'POST', {
                event: event.id,
                user: member.id
              })
          );
          return Promise.all(promises);
        })
  };
}
