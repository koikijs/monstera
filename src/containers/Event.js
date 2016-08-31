import React, {Component, PropTypes} from 'react';
import {load as loadCandidate, select as selectCandidate, unselect as unselectCandidate} from 'redux/modules/candidate';
import {load as loadHoliday} from 'redux/modules/holiday';
import Helmet from 'react-helmet';
import moment from 'moment';
import config from '../config';
import __ from 'lodash';
import {
  Candidate,
  Calendar
} from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    promises.push(dispatch(loadCandidate({
      event: params.event,
      user: getState().auth.data.name
    })));
    promises.push(dispatch(loadHoliday()));
    return Promise.all(promises);
  }
}])
@connect(
  (state, props) => ({
    candidate: state.candidate.items,
    holiday: state.holiday.items,
    auth: state.auth.data,
    event: props.params.event
  }),
  {
    select: selectCandidate,
    unselect: unselectCandidate
  }
)
export default class Event extends Component {
  static propTypes = {
    candidate: PropTypes.array,
    holiday: PropTypes.array,
    auth: PropTypes.object,
    params: PropTypes.object.isRequired,
    event: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    unselect: PropTypes.func.isRequired
  }
  render() {
    const styles = require('../css/event.less');
    const {
      candidate,
      holiday,
      auth,
      event,
      select,
      unselect
    } = this.props;

    const selected = candidate.map(
      item => new Date( item.date )
    );

    return (
      <div className={styles.event}>
        <Helmet {...config.app.head} title={`Coordinate ${event} with others`} />
        <Candidate
          selected={selected}
          onDelete={
            date =>
              unselect({
                user: auth.name,
                event,
                date: moment.utc(date).format()
              })
          }
        />
        <Calendar
          min={moment.utc().startOf('date')}
          holidays={holiday}
          selected={selected}
          onSelect={
            date => {
              if ( __.some(selected, item => moment.utc(item).startOf('date').isSame(date)) ) {
                unselect({
                  user: auth.name,
                  event,
                  date: moment.utc(date).format()
                });
              } else {
                select({
                  user: auth.name,
                  event,
                  date: moment.utc(date).format()
                });
              }
            }
          }
        />
      </div>
    );
  }
}
