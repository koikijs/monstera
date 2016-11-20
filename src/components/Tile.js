import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Tile extends Component {

  static propTypes = {
    logo: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  render() {
    const styles = require('../css/tile.less');
    const {
      logo,
      link,
      title
    } = this.props;

    return (
      <div className={styles.tile}>
        <Link to={link} className={styles.link}>
          <img src={logo} className={styles.logo}/>
          {title ? <p className={styles.title}>{title}</p> : ''}
        </Link>
      </div>
    );
  }
}
