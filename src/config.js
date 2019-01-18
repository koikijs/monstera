require('babel-polyfill');

const title = 'Monstera';
const description = 'Coordinate work with others';

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  global: {
    host: process.env.MONSTERA_HOST,
    port: process.env.MONSTERA_PORT,
    protocol: process.env.MONSTERA_PROTOCOL,
    url: process.env.MONSTERA_PROTOCOL + '://' + process.env.MONSTERA_HOST + (process.env.MONSTERA_PORT ? ':' + process.env.MONSTERA_PORT : '' )
  },
  github: {
    appId: process.env.MONSTERA_GITHUB_CLIENT_ID,
    secret: process.env.MONSTERA_GITHUB_SECRET_ID
  },
  monglURL: '', // If you want to set MongoURL on config, please set here otherwise, process.env.APIKIT_MONGO_URL will be used.
  app: {
    title: title,
    description: description,
    head: {
      titleTemplate: title + ' - %s',
      meta: [
        {name: 'description', content: description},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: title},
        {property: 'og:image', content: 'https://monstera.now.sh/images/logo.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@side_road'},
        {property: 'og:creator', content: '@side_road'},
        {property: 'og:image:width', content: '300'},
        {property: 'og:image:height', content: '300'}
      ]
    }
  }
}, environment);
