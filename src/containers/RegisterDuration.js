import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import uris from '../uris';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {push} from 'react-router-redux';
import {save} from '../redux/modules/register';

const validate = values => {
  const errors = {};
  if (!values.duration) {
    errors.duration = 'Required';
  } else if ( values.duration <= 0 ) {
    errors.duration = 'Must be set 1 or more';
  }
  return errors;
};
@connect(
  (state, props) => ({
    members: state.member.data,
    event: props.params.event
  }),
  {
    push,
    save
  }
)
@reduxForm({
  form: 'duration',
  fields: ['duration'],
  validate
})
export default class RegisterDuration extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    event: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {
        duration
      },
      members,
      event,
      handleSubmit
    } = this.props;

    const submit = ()=>{
      this.props.save({
        event,
        members
      }).then(
        ()=> {
          this.props.push(uris.normalize( uris.events.event, {event}));
        }
      );
    };

    return (
      <form onSubmit={handleSubmit(()=>{
        if ( ! duration.error ) {
          submit();
        }
      })}>
        Every
        <input type="number" {...duration} />
        days
        <ControlButton prev={uris.register.member} submit={
          !duration.error ? submit : undefined
        } />
      </form>
    );
  }
}
