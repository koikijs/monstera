import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';

export default class Body extends Component {
  static propTypes = {
    content: PropTypes.string,
    store: PropTypes.object,
    assets: PropTypes.object,
    token: PropTypes.string
  };

  render() {
    const {
      content,
      store,
      assets,
      token
    } = this.props;
    const styles = require('../css/customize.less');
    return (
      <body className={styles.body}>
        <div id="content" dangerouslySetInnerHTML={{__html: content}} className={styles.content} />
        <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
        <script dangerouslySetInnerHTML={{__html: `window.__token=${serialize(token)};`}} charSet="UTF-8"/>
        <script src={assets.javascript.main} charSet="UTF-8"/>
      </body>
    );
  }
}
