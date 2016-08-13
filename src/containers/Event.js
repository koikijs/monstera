import React, {Component, PropTypes} from 'react';
import {load, select as selectCandidate, unselect as unselectCandidate} from 'redux/modules/candidate';
import moment from 'moment';
import __ from 'lodash';
import {
  Candidate,
  Calendar
} from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    return dispatch(load({
      event: params.event,
      user: getState().auth.data.name
    }));
  }
}])
@connect(
  (state, props) => ({
    candidate: state.candidate.items,
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
        <Candidate
          selected={selected}
          onDelete={
            date =>
              unselect({
                user: auth.name,
                event,
                date: moment(date).format()
              })
          }
        />
        <Calendar
          selected={selected}
          onSelect={
            date => {
              if ( __.some(selected, item => moment(item).startOf('date').isSame(date)) ) {
                unselect({
                  user: auth.name,
                  event,
                  date: moment(date).format()
                });
              } else {
                select({
                  user: auth.name,
                  event,
                  date: moment(date).format()
                });
              }
            }
          }
        />
      </div>
    );
  }
}
