const passport = require('passport')

const localStrategy = require('./strategies/local.estrategy');
const jwtStrategy = require('./strategies/jwt.strategy');

passport.use(localStrategy);
passport.use(jwtStrategy);
