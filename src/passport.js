import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";
import dotenv from "dotenv";
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// - done 우리가 해당 유저를 찾았을 때 실행될 함수
//     you will be passing back information to passport which it will then use for loading things onto the request message.
//    So, when passport parses the request message,
//    it will use the strategy and then extract information,
//    and then load it onto our request message.

const verifyUser = async (payload, done) => {
  try {
    console.log("passport.js / verifyUser / payload: ", payload);
    const user = await prisma.user({ id: payload.id });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log("jwt 인증오류 : ", error);
    return done(error, false);
  }
};

passport.use(new JwtStrategy(jwtOptions, verifyUser));
