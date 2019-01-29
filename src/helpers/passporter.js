import ApiClient from '../helpers/ApiClient';
import passport from 'passport';
import { Strategy } from 'passport-github2';
import config from '../config';
import uris from '../uris';

export default {

  setup: () => {
    // passport setup Strategy
    passport.serializeUser((user, cb) => {
      cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
      cb(null, obj);
    });

    passport.use(new Strategy({
      clientID: process.env.MONSTERA_GITHUB_CLIENT_ID,
      clientSecret: process.env.MONSTERA_GITHUB_CLIENT_SECRET,
      callbackURL: config.global.url + '/auth/github/callback'
    }, (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }));
  },

  use: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/github',
      passport.authenticate('github'));

    app.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/auth/github' }),
      (req, res) => {
        // Successful authentication, redirect home.
        const redirect = req.cookies.redirect;
        if ( redirect ) {
          res.redirect(redirect);
        } else {
          res.redirect('/');
        }
      });

    app.get('/auth', (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401).json({});
    }, (req, res) => {
      const client = new ApiClient(req);
      client
        .fetchJSON('https://chaus.now.sh' + uris.apis.users, 'GET', {
          name: req.user.username,
          limit: 1
        })
        .then(users => {
          if (users.items.length) {
            res.status(200).json({
              id: users.items[0].id,
              name: req.user.username,
              icon: req.user._json.avatar_url
            });
          } else {
            client
              .fetchJSON('https://chaus.now.sh' + uris.apis.users, 'POST', {
                name: req.user.username
              })
              .then(user => {
                res.status(200).json({
                  id: user.id,
                  name: req.user.username,
                  icon: req.user._json.avatar_url
                })
              })
          }
        });
    });
  }
};
