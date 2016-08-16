import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import __ from 'lodash';
import Swipeable from 'react-swipeable';

export default class Calendar extends Component {

  static propTypes = {
    date: PropTypes.object,
    holidays: PropTypes.array,
    selected: PropTypes.array,
    onSelect: PropTypes.func
  };

  state = {
    // date
    // today
  };

  componentWillMount() {
    this.setState({
      date: (this.props.date ? moment.utc(this.props.date) : moment.utc()).startOf('date'),
      today: moment.utc().startOf('date'),
      className: ''
    });
  }

  nextMonth(evt) {
    evt.preventDefault();
    const that = this;
    this.setState({
      date: moment.utc(this.state.date).add(1, 'months'),
      className: 'nextMonth'
    });
    setTimeout( ()=> that.setState({className: ''}), 250);
  }

  prevMonth(evt) {
    evt.preventDefault();
    const that = this;
    this.setState({
      date: moment.utc(this.state.date).subtract(1, 'months'),
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
      selected,
      holidays
    } = this.props;
    const start = moment.utc(date).startOf('month').startOf('week');
    return (
      <div className={styles.calendar}>
        <div className={styles.control + ' ' + styles.clearfix}>
          <div className={styles.prev}>
            <a className={styles.link} onClick={::this.prevMonth} href="" >
              <div className={styles.linkcircle}></div>
              <span><i className="fa fa-chevron-left" aria-hidden="true"></i></span>
            </a>
          </div>
          <Swipeable
            onSwipedRight={::this.prevMonth}
            onSwipedLeft={::this.nextMonth}>
            <div className={styles.month + ' ' + styles[className]}>
              {date.format('MMMM') + ' ' + date.format('YYYY')}
            </div>
          </Swipeable>
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
                    const _date = moment.utc(start).add( (week * 7) + weekday, 'days');
                    const dateClassName = [
                                            (__.some(selected || [], item => _date.isSame(moment.utc(item).startOf('date'))) ? styles.selected : '' ),
                                            (_date.isSame(today) ? styles.today :
                                             __.some(holidays || [], item => _date.isSame(moment.utc(item).startOf('date'))) ? styles.holiday :
                                            !_date.isSame(date, 'month') ? styles.other : ''),
                                            (styles[_date.format('ddd').toLowerCase()])
                    ].join(' ');
                    return (<td key={weekday} className={styles.col}>
                              <div className={dateClassName}>
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
