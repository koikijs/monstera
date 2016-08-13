import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import __ from 'lodash';

export default class Calendar extends Component {

  static propTypes = {
    date: PropTypes.object,
    selected: PropTypes.array,
    onSelect: PropTypes.func
  };

  state = {
    // date
    // today
  };

  componentWillMount() {
    this.setState({
      date: (this.props.date ? moment(this.props.date) : moment()).startOf('date'),
      today: moment().startOf('date'),
      className: ''
    });
  }

  nextMonth(evt) {
    evt.preventDefault();
    const that = this;
    this.setState({
      date: moment(this.state.date).add(1, 'months'),
      className: 'nextMonth'
    });
    setTimeout( ()=> that.setState({className: ''}), 250);
  }

  prevMonth(evt) {
    evt.preventDefault();
    const that = this;
    this.setState({
      date: moment(this.state.date).subtract(1, 'months'),
      className: 'prevMonth'
    });
    setTimeout( ()=> that.setState({className: ''}), 250);
  }

  select(evt, _date) {
    evt.preventDefault();
    if ( _date.isAfter(this.state.date, 'month') ) {
      this.nextMonth(evt);
    }
    if ( _date.isBefore(this.state.date, 'month') ) {
      this.prevMonth(evt);
    }
    if ( this.props.onSelect ) {
      this.props.onSelect(_date.toDate());
    }
  }

  render() {
    const styles = require('../css/calendar.less');
    const {
      date,
      today,
      className
    } = this.state;
    const {
      selected
    } = this.props;
    const start = moment(date).startOf('month').startOf('week');

    return (
      <div className={styles.calendar}>
        <div className={styles.control + ' ' + styles.clearfix}>
          <div className={styles.prev}>
            <a className={styles.link} onClick={::this.prevMonth} href="" >
              <div className={styles.linkcircle}></div>
              <span><i className="fa fa-chevron-left" aria-hidden="true"></i></span>
            </a>
          </div>
          <div className={styles.month + ' ' + styles[className]}>{date.format('MMMM') + ' ' + date.format('YYYY')}</div>
          <div className={styles.next}>
            <a className={styles.link} onClick={::this.nextMonth} href="" >
              <div className={styles.linkcircle}></div>
              <span><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
            </a>
          </div>
        </div>
        <table className={styles.table + ' ' + styles[className]}>
          <thead>
            <tr>
              {__.times(7, index =>
                <th key={index} className={styles.weekday}>
                  {moment().weekday(index).format('ddd')}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {
              __.times(5, week =>
                <tr key={week}>
                  {__.times(7, weekday => {
                    const _date = moment(start).add( (week * 7) + weekday, 'days');
                    return (<td key={weekday} className={styles.col}>
                              <div className={__.some(selected || [], item => _date.isSame(moment(item).startOf('date'))) ? styles.selected :
                                              _date.isSame(today) ? styles.today :
                                              _date.isSame(date, 'month') ? styles.notselected : styles.disabled}>
                                <div className={styles.date}>
                                  <a className={styles.link} href="" onClick={evt => this.select(evt, _date)}>
                                    <div className={styles.linkcircle}></div>
                                    <span>{_date.date()}</span>
                                  </a>
                                </div>
                              </div>
                            </td>);
                  })}
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
