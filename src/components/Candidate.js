import React, {Component, PropTypes} from 'react';
import moment from 'moment';

export default class Candidate extends Component {

  static propTypes = {
    selected: PropTypes.array,
    onDelete: PropTypes.func.isRequired
  };

  focus(evt) {
    evt.preventDefault();
  }

  delete(evt, date) {
    evt.preventDefault();
    this.props.onDelete(date.toDate());
  }

  render() {
    const styles = require('../css/candidate.less');
    const {
      selected
    } = this.props;

    return (
      <div className={styles.candidate + ' ' + styles.clearfix}>
        <div className={styles.lead + ' ' + (!selected.length ? styles.emptyLead : '')}>
          {!selected.length ? 'Select available days' : 'I\'ll be available on'}
        </div>
        {
          !selected.length
          ? <div className={styles.empty}>
              <div className={styles.arrow}>
                <i className="fa fa-arrow-right" />
              </div>
            </div>
          : <div className={styles.exists}>
              <ul className={styles.dates}>
                {
                  selected.sort((itemA, itemB) => {
                    return itemA > itemB ? 1 : -1;
                  }).map(item => {
                    const date = moment.utc(item).startOf('date');
                    return (
                      <li key={date.format('ll')} className={styles.item} >
                        <span className={styles.date} >{date.format('ll')}</span>
                        <a className={styles.close} href="" onClick={evt => this.delete(evt, date)}><i className="fa fa-times" /></a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
        }
      </div>
    );
  }
}
