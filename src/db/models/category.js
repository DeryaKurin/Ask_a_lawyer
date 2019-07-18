'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Question, {
      foreignKey: "categoryId",
      as: "questions"
    });
  };
  return Category;
};
