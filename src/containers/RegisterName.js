import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';

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
  state => ({
    routing: state.routing
  }),
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
    const MEMBER_URL = '/register/member';

    const styles = require('../css/customize.less');
    return (
      <form onSubmit={handleSubmit(()=>{
        if ( ! name.error ) {
          this.props.push(MEMBER_URL);
        }
      })}>
        <div className={styles.createEventMessageLeft} >I will hold</div>
        <div className={styles.createEventBoard} >&quot;<input className={styles.createEventTextbox} type="text" {...name} autoComplete="off" />&quot;</div>
        <div className={styles.createEventMessageRight} >Event.</div>
        <ControlButton prev={''} next={name.error ? '' : MEMBER_URL} />
      </form>
    );
  }
}
