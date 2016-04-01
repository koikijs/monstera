import __ from 'lodash';
import {} from 'isomorphic-fetch';
import config from '../config';

const string = values => {
  return __.map(values, (value, key) =>
    encodeURIComponent(key) + '=' + encodeURIComponent(value)
  ).join('&');
};

const getHeader = (req, token) => {
  const headers = {};

  if (req) {
    headers.cookie = req.get('cookie');
  }

  if (token) {
    headers.Authorization = 'token ' + token;
  }

  return {
    method: 'GET',
    headers: headers
  };
};

const postHeader = (values, req, token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (req) {
    headers.cookie = req.get('cookie');
  }

  if (token) {
    headers.Authorization = 'token ' + token;
  }

  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify( values )
  };
};


const deleteHeader = (values, req, token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (req) {
    headers.cookie = req.get('cookie');
  }

  if (token) {
    headers.Authorization = 'token ' + token;
  }

  return {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify( values )
  };
};

export default class ApiClient {
  constructor(req, token) {
    this.fetchJSON = ( path = '/', method = 'GET', values = {} ) => {
      console.log('## fetch ', path, method, values);

      const base = __SERVER__ ? 'http://' + config.host + ':' + config.port
                              : '';

      return new Promise((resolve, reject) => {
        fetch( base + path +
                      (method === 'GET' ? '?' + string(values) :
                                          ''),
                      (method === 'GET' ? getHeader( req, token ) :
                       method === 'POST' ? postHeader( values, req, token ) :
                       method === 'DELETE' ? deleteHeader( values, req, token ) : ''))
               .then(res => {
                 if ( !res.ok ) {
                   res.json().then((json) => {
                     console.log(json);
                     reject(json);
                   });
                 } else if ( method === 'GET' ) {
                   res.json().then((json) => {
                     console.log(json);
                     resolve(json);
                   });
                 } else {
                   resolve({});
                 }
               });
      });
    };
  }
}
