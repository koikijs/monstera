import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import {pushState} from 'redux-router';

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
  {pushState}
)
@reduxForm({
  form: 'eventName',
  fields: ['name'],
  validate
})
export default class RegisterName extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        name
      },
      handleSubmit
    } = this.props;
    const DATE_URL = '/register/date';

    const styles = require('../css/customize.less');
    return (
      <form onSubmit={handleSubmit(()=>{
        if ( ! name.error ) {
          this.props.pushState(null, DATE_URL, '');
        }
      })}>
        <div className={styles.createEventMessageLeft} >I will hold</div>
        <div className={styles.createEventBoard} >&quot;<input className={styles.createEventTextbox} type="text" {...name} />&quot;</div>
        <div className={styles.createEventMessageRight} >Event.</div>
        <ControlButton prev={''} next={name.error ? '' : DATE_URL} />
      </form>
    );
  }
}
