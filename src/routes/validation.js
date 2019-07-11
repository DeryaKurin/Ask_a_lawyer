module.exports = {
  validateUsers(req, res, next) {
     if(req.method === "POST") {

       req.checkBody("name", "must be at least 2 charachters long").optional().isLength({min: 2});
       req.checkBody("email", "must be a valid format").isEmail();
       req.checkBody("phone", "must contain only numbers").optional().isNumeric();
       req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
       req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
     }

     const errors = req.validationErrors();

     if (errors) {
       console.log("WE HAD ERRORS:");
       req.flash("error", errors);
       return res.redirect(303, req.headers.referer);
     } else {
       console.log("NO ERRORS MOVING ON");
       return next();
     }
  }
}
