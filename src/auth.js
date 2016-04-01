import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github2';
import config from './config';

export default function auth(app) {

  passport.serializeUser(function then(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function then(obj, done) {
    done(null, obj);
  });
  passport.use(
    new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: ( config.port === '81' ? 'https://' : 'http://' ) + config.host +
                   ( config.port !== '80' && config.port !== '81' ? ( ':' + config.port ) : '' ) + '/auth/github/callback'
    },
    function then(accessToken, refreshToken, profile, done) {
      const user = profile;
      user.token = accessToken;
      return done(null, user);
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/github', passport.authenticate('github'), function then(req, res, next) {
    return next();
  });

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    function then(req, res) {
      console.log(req.user);
      res.redirect('/');
    }
  );
}
