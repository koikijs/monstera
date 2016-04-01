import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlButton} from '../components';
import {reduxForm} from 'redux-form';
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
  state => ({
    routing: state.routing,
    suggests: state.suggest.data,
    index: state.suggest.index,
    selected: state.suggest.selected
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
    selected: PropTypes.string,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render() {
    const {
      fields: {
        query
      },
      handleSubmit,
      suggests,
      index,
      prev,
      next,
      set,
      selected,
      add,
      load
    } = this.props;

    const styles = require('../css/member.less');
    return (
      <form onSubmit={handleSubmit(()=>{
      })}>
        <div className={styles.search} >&quot;
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
                  add(selected);
                  evt.preventDefault();
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
                 >
               <img className={styles.icon} src={suggest.icon} />
               <span className={styles.name}>{suggest.name}</span>
             </li>
          )}
          </ul> : ''
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
