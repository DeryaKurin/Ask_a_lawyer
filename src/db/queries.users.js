const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {

  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      password: hashedPassword,
      role: newUser.role
    })
    then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback) {
    let result = {};
    User.findById(id)
    .then((user) => {

      if(!user) {
        callback(404);
      } else {
        result["user"] = user;
      }
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
