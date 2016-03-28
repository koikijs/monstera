import React, {Component, PropTypes} from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    const styles = require('../css/customize.less');
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    );
  }
}
