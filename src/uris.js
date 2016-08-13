export default {
  register: {
    name: '/register',
    member: '/register/:event/member',
    duration: '/register/:event/duration'
  },
  pages: {
    top: ''
  },
  events: {
    event: '/events/:event'
  },
  apis: {
    auth: '/auth',
    users: '/apis/monstera/users',
    events: '/apis/monstera/events',
    attendees: '/apis/monstera/attendees'
  },
  login: {
    login: '/login'
  },

  // normarized function
  normalize: (_uri, params) => {
    let uri = _uri;
    Object.keys(params).forEach(key =>
      uri = uri.replace(':' + key, encodeURIComponent(params[key]))
    );
    if (/\:/.test(uri) ) {
      throw new Error('Required params are remained [' + uri + ']');
    }
    return uri;
  }
};