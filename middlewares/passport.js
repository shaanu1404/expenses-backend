const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { JWT_SECRET_ACCESS } = process.env;
const User = require("../models/user");

const options = {
  secretOrKey: JWT_SECRET_ACCESS,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

module.exports = (passport) => {
  passport.use(
    new JWTstrategy(options, async (req, { userId: id }, done) => {
      try {
        if (!req.headers.authorization) {
          throw new Error();
        }
        const token = req.headers.authorization?.split("Bearer ")[1];
        const user = await User.findOne({
          where: { id, token },
        });
        return done(null, user);
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
