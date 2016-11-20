import __ from 'lodash';
import {} from 'isomorphic-fetch';

const string = values => {
  return __.map(values, (value, key) =>
    encodeURIComponent(key) + '=' + encodeURIComponent(value)
  ).join('&');
};

const getHeader = (req) => {
  const headers = {};

  if (req) {
    headers.cookie = req.get('cookie');
    headers.referer = req.get('referer');
    headers.origin = req.get('origin');
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
    headers.referer = req.get('referer');
    headers.origin = req.get('origin');
  }

  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify( values )
  };
};

const patchHeader = (values, req) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (req) {
    headers.cookie = req.get('cookie');
    headers.referer = req.get('referer');
    headers.origin = req.get('origin');
  }

  return {
    method: 'PATCH',
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
    headers.referer = req.get('referer');
    headers.origin = req.get('origin');
  }

  return {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify( values )
  };
};

export default class ApiClient {
  constructor(req, logger = console.log) {

    this.fetchJSON = ( _url = '', method = 'GET', values = {} ) => {

      if ( !_url ) {
        throw new Error('URL does not specified');
      }

      return new Promise((resolve, reject) => {
        const url = _url + (method === 'GET' ? '?' + string(values) : '');
        logger('## fetch ', url, method, values);

        fetch( url, (method === 'GET' ? getHeader( req ) :
                     method === 'POST' ? postHeader( values, req ) :
                     method === 'PATCH' ? patchHeader( values, req ) :
                     method === 'DELETE' ? deleteHeader( values, req ) : ''))
               .then(res => {
                 if ( !res.ok ) {
                   res.json().then((json) => {
                     reject(json);
                   }, ()=>{
                     reject({});
                   });
                 } else if ( method === 'GET' ) {
                   res.json().then((json) => {
                     resolve(json);
                   }, ()=>{
                     reject({});
                   });
                 } else {
                   resolve({});
                 }
               }, ()=>{
                 reject({});
               });
      });
    };
  }
}
