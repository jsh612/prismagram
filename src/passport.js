import passport from "passport";
import JwtStrategy from "passport-jwt";
dotenv.config();

console.log("passport.js / JWT_SECRET", JWT_SECRET);
const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// - done 우리가 해당 유저를 찾았을 때 실행될 함수
//     you will be passing back information to passport which it will then use for loading things onto the request message.
//    So, when passport parses the request message,
//    it will use the strategy and then extract information,
//    and then load it onto our request message.

const verifyUser = (jwt_payload, done) => {};

passport.use(new JwtStrategy(jwtOptions, verifyUser));
