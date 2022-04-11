const passport = require('passport')

const localStrategy = require('./strategies/local.estrategy');

passport.use(localStrategy);
