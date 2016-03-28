import React, {Component} from 'react';

export default class DataHome extends Component {
  render() {
    const styles = require('../css/customize.less');
    const contents = {
      title: 'Monstera',
      lead: 'Manipulate API data'
    };
    return (
      <div className={'uk-width-medium-8-10 ' + styles['cm-contents']} >
        <article className="uk-article">
          <h1 className={'uk-article-title ' + styles['cm-title']}>{contents.title}</h1>
          <p className="uk-article-lead">{contents.lead}</p>
          <hr className="uk-article-divider" />
          <div className={styles['cm-symbolic']} >
            <img src="/images/symbolic.png" />
          </div>
        </article>
      </div>
    );
  }
}
