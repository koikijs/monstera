import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class ControlButton extends Component {

  static propTypes = {
    prev: PropTypes.string,
    next: PropTypes.string
  };

  render() {
    const styles = require('../css/customize.less');
    const {
      prev,
      next
    } = this.props;
    return (
      <div className={styles.controlButton}>
        {prev ? <Link className={styles.prevButton} to={prev}>
                  <i className={'fa fa-arrow-left'} />
                </Link> : ''}
        {next ? <Link className={styles.nextButton} to={next}>
                  <i className={'fa fa-arrow-right'} />
                </Link> : ''}
      </div>
    );
  }
}
