import React, {Component} from 'react';

export default class RegisterDate extends Component {
  render() {
    const styles = require('../css/customize.less');
    return (
      <div>
        <table className={styles.calendar}>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    );
  }
}
