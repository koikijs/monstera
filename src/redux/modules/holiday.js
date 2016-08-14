import moment from 'moment';
const LOAD = 'holiday/LOAD';
const LOAD_SUCCESS = 'holiday/LOAD_SUCCESS';
const LOAD_FAIL = 'holiday/LOAD_FAIL';

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
        items: action.result.items.map(item => moment.utc(item.start.date).toDate())
      };
    case LOAD_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: client =>
      client.fetchJSON('https://www.googleapis.com/calendar/v3/calendars/japanese__ja@holiday.calendar.google.com/events', 'GET', {
        key: 'AIzaSyAS8zf_qluTa22Iq4VMgbNWBnOM6O37Kz8',
        timeMin: moment.utc().startOf('date').format(),
        timeMax: moment.utc().startOf('date').add(3, 'year').format(),
        maxResults: 100,
        orderBy: 'startTime',
        singleEvents: true
      })
  };
}
