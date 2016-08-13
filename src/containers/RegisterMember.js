import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
import uris from '../uris';
import * as suggestActions from 'redux/modules/suggest';
import * as memberActions from 'redux/modules/member';

const validate = values => {
  const errors = {};
  if (!values.member) {
    errors.name = 'Required';
  }
  return errors;
};

@connect(
  (state, props) => ({
    routing: state.routing,
    suggests: state.suggest.data,
    members: state.member.data,
    index: state.suggest.index,
    selected: state.suggest.selected,
    initialValues: {
      query: state.suggest.query
    },
    event: props.params.event
  }),
  {
    ...suggestActions,
    add: memberActions.add
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
    suggests: PropTypes.array,
    index: PropTypes.number,
    params: PropTypes.object.isRequired,
    selected: PropTypes.string,
    members: PropTypes.array,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        query
      },
      clear,
      suggests,
      members,
      index,
      prev,
      next,
      set,
      event,
      selected,
      add,
      load
    } = this.props;

    const styles = require('../css/register-member.less');
    return (
      <form>
        <div className={styles.search + ' ' + (suggests.length ? styles.matched : '')} >&quot;
          <input
            className={styles.text}
            type="text"
            {...query}
            onChange={
              (evt)=>{
                load(evt.target.value);
              }
            }
            onKeyDown={
              evt => {
                if (evt.key === 'ArrowUp') {
                  prev();
                  evt.preventDefault();
                }
                if (evt.key === 'ArrowDown') {
                  next();
                  evt.preventDefault();
                }
                console.log(selected);
                if (evt.key === 'Enter' && selected) {
                  evt.preventDefault();
                  add(selected).then(
                    ()=>{
                      clear();
                    }
                  );
                }
              }
            }
            autoComplete="off" />&quot;</div>
        {
          suggests.length ?
          <ul className={styles.suggest}>
          {suggests.map((suggest, _index) =>
             <li key={suggest.login}
                 className={styles.item + ' ' + ( index === _index ? styles.selected : '' )}
                 onMouseEnter={
                   () => {
                     set(_index);
                   }
                 }
                 onClick={
                   (evt)=>{
                     evt.preventDefault();
                     add(selected).then(
                       ()=>{
                         clear();
                       }
                     );
                   }
                 }>
               <img className={styles.icon} src={suggest.icon} />
               <span className={styles.name}>{suggest.name}</span>
             </li>
          )}
          </ul> : ''
        }
        {
          members.map(member =>
            <div className={styles.card} key={member.name}>
              <div className={styles.primary}>
                <img src={member.icon} className={styles.icon} />
                <span className={styles.name} >{member.name}</span>
              </div>
              <div className={styles.secondary}>
                {member.email}
              </div>
            </div>
          )
        }
        <ControlButton prev={uris.register.name} next={members.length ? uris.normalize( uris.register.duration, {event} ) : ''} />
      </form>
    );
  }
}
