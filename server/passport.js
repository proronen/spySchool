module.exports = function (passport) {
    const passportJWT = require('passport-jwt');
    const JwtStrategy = passportJWT.Strategy;
    const ExtractJWT = passportJWT.ExtractJwt;

    const options = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secretOrKey
    };

    const strategy = new JwtStrategy(options, (payload,next) => {
        next(null, user);
    }) 

    passport.use(strategy);
    return passport;
}