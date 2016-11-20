import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import config from '../config';
import {load as loadOrg} from 'redux/modules/org';
import uris from '../uris';
import {
  Tile,
  Members,
  Edit
} from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
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
  }
)
export default class Event extends Component {
  static propTypes = {
    auth: PropTypes.object,
    params: PropTypes.object.isRequired,
    event: PropTypes.string.isRequired,
    org: PropTypes.object.isRequired
  }
  render() {
    const styles = require('../css/event.less');
    const {
      event,
      org
    } = this.props;

    return (
      <div className={styles.event}>
        <Helmet {...config.app.head} title={`Coordinate ${event} with others`} />
        <div className={styles.left}>
          <Tile
            title={org.name}
            logo={org.avatar_url}
            link={uris.normalize( uris.events.event, {event} )}
          />
          <Members
            members={
              [
                {
                  name: 'sideroad',
                  url: 'https://github.com/sideroad/',
                  icon: 'https://avatars.githubusercontent.com/u/411486?v=3'
                },
                {
                  name: 'taka66',
                  url: 'https://github.com/sideroad/',
                  icon: 'https://avatars.githubusercontent.com/u/411486?v=3'
                }
              ]
            }
          />
        </div>
        <Edit
          min={4}
        />
      </div>
    );
  }
}
