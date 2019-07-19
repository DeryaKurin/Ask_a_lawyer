const bcrypt = require("bcryptjs");

module.exports = {

  ensureAuthenticated(req, res, next) {
     if (!req.user) {
       console.log("NO USER IN HELPER");
       req.flash("notice", "You must be signed in to do that.")
       return res.redirect("/users/sign_in");
     } else {
       console.log("WE ARE GOOD IN HELPER");
       next();
     }
   },

   comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
   }

 }
