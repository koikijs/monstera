import React, {Component, PropTypes} from 'react';
export default class Members extends Component {

  static propTypes = {
    members: PropTypes.array.isRequired
  };

  render() {
    const styles = require('../css/members.less');
    const {
      members
    } = this.props;
    console.log(members);

    return (
      <div className={styles.members}>
        <p className={styles.lead}>Members</p>
        <ul className={styles.list}>
          {
            members.map(member =>
              <li key={member.name} className={styles.item} >
                <a href={member.url} className={styles.link} >
                  <img src={member.icon} className={styles.icon} />
                  <span className={styles.name} >{member.name}</span>
                </a>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
