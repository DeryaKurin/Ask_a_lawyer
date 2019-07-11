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
    console.log("WE ARE INSIDE NEW USER");
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      role: req.body.role
    };

    userQueries.createUser(newUser, (err, user) => {
      console.log("CREATING USER");
      if(err) {
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate('local')(req, res, () => {
            req.flash("notice", "You've successfully sign in!");
            res.redirect("/");
        })
      }
    });
  },

  signInForm(req, res, next) {
    res.render("users/sign_in");
  },

  signIn(req, res, next) {
    passport.authenticate('local')(req, res, function() {
      if(!req.user) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully sign in!");
        res.redirect("/");
      }
    })
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },

  show(req, res, next) {
    userQueries.getUser(req.params.id, (err, result) => {
      if(err || !result.user) {
        req.flash("notice", "No user found with that ID.");
        res.redirect("/");
      } else {
        res.render("users/show", {...result});
      }
    });
  }
}
