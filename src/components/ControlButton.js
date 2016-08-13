import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class ControlButton extends Component {

  static propTypes = {
    prev: PropTypes.string,
    next: PropTypes.string,
    submit: PropTypes.func
  };

  render() {
    const styles = require('../css/control-button.less');
    const {
      prev,
      next,
      submit
    } = this.props;
    return (
      <div className={styles.buttons}>
        {prev ? <Link className={styles.prev} to={prev}>
                  <i className={'fa fa-arrow-left'} />
                </Link> : ''}
        {next ? <Link className={styles.next} to={next}>
                  <i className={'fa fa-arrow-right'} />
                </Link> : ''}
        {submit ? <a className={styles.next} onClick={
                    () => submit()
                  }>
                    <i className={'fa fa-arrow-right'} />
                  </a> : ''}
      </div>
    );
  }
}
