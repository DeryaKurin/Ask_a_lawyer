'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isEmail: { msg: "must be a valid email" }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.isEnquirer = function () {
    return this.role == 0;
  };

  User.prototype.isAdvisor = function() {
    return this.role == 1;
  };

  User.prototype.isAdmin = function() {
    return this.role == 2;
  };

  return User;
};
