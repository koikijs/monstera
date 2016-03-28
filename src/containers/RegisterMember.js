import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import {pushState} from 'redux-router';

const validate = values => {
  const errors = {};
  if (!values.member) {
    errors.name = 'Required';
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
  form: 'eventMember',
  fields: ['member'],
  validate
})
export default class RegisterMember extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        member
      },
      handleSubmit
    } = this.props;

    const styles = require('../css/customize.less');
    return (
      <form onSubmit={handleSubmit(()=>{
      })}>
        <div className={styles.createEventBoard} >&quot;<input className={styles.createEventTextbox} type="text" {...member} />&quot;</div>

        <ControlButton prev={'/register/name'} next={name.error ? '' : ''} />
      </form>
    );
  }
}
