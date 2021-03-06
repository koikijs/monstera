import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';
import uris from '../uris';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if ( values.name.length < 5 ||
              values.name.length > 15) {
    errors.name = 'Must be between 5 and 15 characters';
  }
  return errors;
};

@connect(
  () => ({}),
  {
    push: push
  }
)
@reduxForm({
  form: 'eventName',
  fields: ['name'],
  validate
})
export default class RegisterName extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        name
      },
      handleSubmit
    } = this.props;

    const submit = () => this.props.push( uris.normalize( uris.register.member, {event: name.value}));

    const styles = require('../css/register-name.less');
    return (
      <form onSubmit={handleSubmit(()=>{
        if ( ! name.error ) {
          submit();
        }
      })}>
        <div className={styles.left} >I will hold</div>
        <div className={styles.board} >&quot;<input className={styles.textbox} type="text" {...name} autoComplete="off" />&quot;</div>
        <div className={styles.right} >Event.</div>
        <ControlButton prev={''} submit={
          !name.error ? ()=> submit() : undefined
        } />
      </form>
    );
  }
}
