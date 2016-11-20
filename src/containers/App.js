import React, {Component, PropTypes} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import uris from '../uris';

@connect(
  (state) => ({
    auth: state.auth.data
  }),
  {push}
)
export default class App extends Component {
  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }
  render() {
    require('../css/customize.less');
    const logo = require('../images/logo.png');
    const styles = require('../css/app.less');
    const {
      auth,
    } = this.props;

    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <Link to={uris.pages.top}>
            <img className={styles.logo} src={logo} /><span className={styles.logotext} >Monstera</span>
          </Link>
        </div>
        {auth.icon
          ? <div className={styles.user}>
              <img className={styles.icon} src={auth.icon} />
            </div>
          : ''}
        {this.props.children}
      </div>
    );
  }
}
