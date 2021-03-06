const Category = require("./models").Category;
const Question = require("./models").Question;
const User = require("./models").User;

module.exports = {
  getAllCategories(callback) {
    return Category.all()
    .then((categories) => {
      callback(null, categories);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getCategory(id, callback) {

    return Category.findById(id, {
      include: [{
        model: Question,
        as: "questions"
      }]
    })
    .then((category) => {
      callback(null, category);
    })
    .catch((err) => {
      callback(err);
    })
  },

  create(newCategory, callback) {
    return Category.create({
      title: newCategory.title,
      description: newCategory.description
    })
    .then((category) => {
      callback(null, category);
    })
    .catch((err) => {
      callback(err);
    });
  },

  deleteCategory(id, callback) {
    return Category.destroy({
      where: {id}
    })
    .then((category) => {
      callback(null, category);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateCategory(id, updatedCategory, callback) {
    return Category.findById(id)
    .then((category) => {
      if(!category) {
        return callback("Category not found");
      }

      category.update(updatedCategory, {
        fields: Object.keys(updatedCategory)
      })
      .then(() => {
        callback(null, category);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
