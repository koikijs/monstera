import React, {Component, PropTypes} from 'react';

export default class Edit extends Component {

  static propTypes = {
    min: PropTypes.number
  };

  render() {
    const styles = require('../css/edit.less');
    const {
    } = this.props;

    return (
      <div className={styles.edit}>
      </div>
    );
  }
}
