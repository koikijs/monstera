import React, {Component, PropTypes} from 'react';


export default class Register extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const styles = require('../css/customize.less');
    return (
      <div className={styles.register}>
        <div className={styles.createEvent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
