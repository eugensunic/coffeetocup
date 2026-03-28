const { setCookieMaxAge } = require('../../global/utils');

module.exports = {
  init: (app, passport) => {
    app.get(
      "/auth/google",
      passport.authenticate("google", {
        scope: ["email", "profile"]
      })
    );

    app.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        failureRedirect: "/error"
      }),
      (req, res) => {
        // Successful authentication, redirect home.
        res.cookie("auth", req.session, setCookieMaxAge());
        res.redirect("/profile");
      }
    );
  }
};
