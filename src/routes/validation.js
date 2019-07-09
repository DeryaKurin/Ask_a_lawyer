module.exports = {
  validateUsers(req, res, next) {
     if(req.method === "POST") {

       req.checkBody("name", "must be at least 2 charachters").isLength({min: 2});
       req.checkBody("email", "must be valid").isEmail();
       req.checkBody("phone", "must be valid").isNumeric();
       req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
       req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
     }

     const errors = req.validationErrors();

     if (errors) {
       req.flash("error", errors);
       return res.redirect(303, req.headers.referer);
     } else {
       return next();
     }
  }
}
