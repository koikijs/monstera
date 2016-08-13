import React, {Component, PropTypes} from 'react';


export default class Register extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const styles = require('../css/register.less');
    return (
      <div className={styles.register}>
        <div className={styles.create}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
