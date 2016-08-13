import passport from 'passport';
import { Strategy } from 'passport-github2';
import cookie from 'react-cookie';
import config from '../config';

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
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: config.global.protocol + '://' + config.global.host + (config.global.port ? ':' + config.global.port : '' ) + '/auth/github/callback'
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
        const redirect = cookie.load('redirect');
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
      res.status(200).json({
        name: req.user.username,
        icon: req.user._json.avatar_url
      });
    });
  }
};
