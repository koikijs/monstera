import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';
import {login} from '../redux/modules/auth';
import uris from '../uris';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

@connect(
  () => ({}),
  {
    push,
    login
  }
)
@reduxForm({
  form: 'login',
  fields: ['name'],
  validate
})
export default class Login extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        name
      },
      handleSubmit
    } = this.props;

    const submit = () => {
      this.props.login(name.value);
      this.props.push( uris.register.name );
    };

    const styles = require('../css/login.less');
    return (
      <form onSubmit={handleSubmit(()=>{
        if ( ! name.error ) {
          submit();
        }
      })}>
        <div className={styles.left} >My name is</div>
        <div className={styles.board} >&quot;<input className={styles.textbox} type="text" {...name} autoComplete="off" />&quot;</div>
        <ControlButton prev={''} submit={
          !name.error ? ()=> submit() : undefined
        } />
      </form>
    );
  }
}
