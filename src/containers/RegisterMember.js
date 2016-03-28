import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import * as suggestActions from 'redux/modules/suggest';

const validate = values => {
  const errors = {};
  if (!values.member) {
    errors.name = 'Required';
  }
  return errors;
};

@connect(
  state => ({
    routing: state.routing,
    suggests: state.suggest.data
  }),
  {
    load: suggestActions.load
  }
)
@reduxForm({
  form: 'eventMember',
  fields: ['query'],
  validate
})
export default class RegisterMember extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    suggests: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        query
      },
      handleSubmit,
      suggests,
      load
    } = this.props;

    const styles = require('../css/member.less');
    return (
      <form onSubmit={handleSubmit(()=>{
      })}>
        <div className={styles.search} >&quot;<input className={styles.text} type="text" {...query} onChange={
          (evt)=>{
            load(evt.target.value);
          }
        } list="suggest" />&quot;</div>
        {
          suggests.length ?
          <datalist id="suggest">
          {suggests.map(suggest => <option key={suggest.login} value={suggest.login} />)}
          </datalist> : ''
        }
        <div className={styles.card}>
          <div className={styles.primary}>
            <img src="https://avatars.githubusercontent.com/u/411486?v=3" className={styles.icon} />
            <span className={styles.name} >sideroad</span>
          </div>
          <div className={styles.secondary}>
            sideroad.jp@gmail.com
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.primary}>
            <img src="https://avatars.githubusercontent.com/u/411486?v=3" className={styles.icon} />
            <span className={styles.name} >sideroad</span>
          </div>
          <div className={styles.secondary}>
            sideroad.jp@gmail.com
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.primary}>
            <img src="https://avatars.githubusercontent.com/u/411486?v=3" className={styles.icon} />
            <span className={styles.name} >sideroad</span>
          </div>
          <div className={styles.secondary}>
            sideroad.jp@gmail.com
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.primary}>
            <img src="https://avatars.githubusercontent.com/u/411486?v=3" className={styles.icon} />
            <span className={styles.name} >sideroad</span>
          </div>
          <div className={styles.secondary}>
            sideroad.jp@gmail.com
          </div>
        </div>
        <ControlButton prev={'/register/name'} next={name.error ? '' : ''} />
      </form>
    );
  }
}
