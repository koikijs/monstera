import __ from 'lodash';
import {} from 'isomorphic-fetch';
import config from '../config';

const string = values => {
  return __.map(values, (value, key) =>
    encodeURIComponent(key) + '=' + encodeURIComponent(value)
  ).join('&');
};

const getHeader = (req) => {
  const headers = {};

  if (req) {
    headers.cookie = req.get('cookie');
    headers.referer = config.global.url;
  }

  return {
    method: 'GET',
    headers: headers
  };
};

const postHeader = (values, req) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (req) {
    headers.cookie = req.get('cookie');
  }

  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify( values )
  };
};


const deleteHeader = (values, req) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (req) {
    headers.cookie = req.get('cookie');
  }

  return {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify( values )
  };
};

export default class ApiClient {
  constructor(req) {
    this.fetchJSON = ( path = '/', method = 'GET', values = {} ) => {

      return new Promise((resolve, reject) => {
        const url = path + (method === 'GET' ? '?' + string(values) : '');
        console.log('## fetch ', url, method, values);

        fetch( url, (method === 'GET' ? getHeader( req ) :
                     method === 'POST' ? postHeader( values, req ) :
                     method === 'DELETE' ? deleteHeader( values, req ) : ''))
               .then(res => {
                 if ( !res.ok ) {
                   res.json().then((json) => {
                     console.log('reject', json);
                     reject(json);
                   });
                 } else if ( method === 'GET' ) {
                   res.json().then((json) => {
                     console.log(json);
                     resolve(json);
                   });
                 } else {
                   console.log(res, res.headers, res.headers.get('Location'), res.headers.get('location'), res.headers.keys());
                   // Display the keys
                   for (const key of res.headers.keys()) {
                     console.log(key);
                   }
                   resolve({});
                 }
               });
      });
    };
  }
}
