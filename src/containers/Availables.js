import React, {Component, PropTypes} from 'react';
import {load as loadCandidate, select as selectCandidate, unselect as unselectCandidate} from 'redux/modules/candidate';
import {load as loadHoliday} from 'redux/modules/holiday';
import {load as loadOrg} from 'redux/modules/org';
import Helmet from 'react-helmet';
import moment from 'moment';
import config from '../config';
import __ from 'lodash';
import uris from '../uris';
import {
  Candidate,
  Calendar,
  Tile
} from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    promises.push(dispatch(loadCandidate({
      event: params.event,
      user: getState().auth.data.name,
      date: '[' + moment.utc().startOf('date').format('YYYY-MM-DD') + ',' + moment.utc().add(1, 'year').startOf('date').format('YYYY-MM-DD') + ']'
    })));
    promises.push(dispatch(loadHoliday()));
    promises.push(dispatch(loadOrg(params.event)));
    return Promise.all(promises);
  }
}])
@connect(
  (state, props) => ({
    candidate: state.candidate.items,
    holiday: state.holiday.items,
    auth: state.auth.data,
    event: props.params.event,
    org: state.org.item
  }),
  {
    select: selectCandidate,
    unselect: unselectCandidate
  }
)
export default class Availables extends Component {
  static propTypes = {
    candidate: PropTypes.array,
    holiday: PropTypes.array,
    auth: PropTypes.object,
    params: PropTypes.object.isRequired,
    event: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    unselect: PropTypes.func.isRequired,
    org: PropTypes.object.isRequired
  }
  render() {
    const styles = require('../css/availables.less');
    const {
      candidate,
      holiday,
      auth,
      event,
      select,
      unselect,
      org
    } = this.props;

    const selected = candidate.map(
      item => new Date( item.date )
    );

    return (
      <div className={styles.availables}>
        <Helmet {...config.app.head} title={`Coordinate ${event} with others`} />
        <div className={styles.left}>
          <Tile
            logo={org.avatar_url}
            link={uris.normalize( uris.events.event, {event} )}
          />
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
        </div>
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
