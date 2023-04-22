import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import Users from "../models/user.model.js";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        const user = await Users.create({
          email,
          password,
          username: req.body.username,
        });

        return cb(null, user);
      } catch (err) {
        cb(err);
      }
    }
  )
);
