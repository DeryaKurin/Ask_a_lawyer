// const User = require("../db/models/").User;
const userQueries = require("../db/queries.users.js");
const passport = require("passport");


module.exports = {

  signUp(req, res, next) {
    res.render("users/sign_up");
  },

  signUpEnquirer(req, res, next) {
    res.render("users/sign_up_enquirer");
  },

  signUpAdvisor(req, res, next) {
    res.render("users/sign_up_advisor");
  },

  createUser(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      role: req.body.role
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  }
}
