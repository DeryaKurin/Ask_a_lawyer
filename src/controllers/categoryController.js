const categoryQueries = require("../db/queries.categories.js");

module.exports = {
  index(req, res, next) {
    categoryQueries.getAllCategories((err, categories) => {
      if(err) {
        res.redirect(500, "static/index");
      } else {
        res.render("categories/index", {categories});
      }
    });
  },

  new(req, res, next) {
    res.render("categories/new");
  },

  create(req, res, next) {
    let newCategory = {
      title: req.body.title,
      description: req.body.description
    };
    categoryQueries.create(newCategory, (err, category) => {
      if (err) {
        res.redirect(500, "/categories/new");
      } else {
        res.redirect(303, `/categories/${category.id}`);
      }
    });
  },

  show(req, res, next) {
    categoryQueries.getCategory(req.params.id, (err, category) => {
      if(err || !category) {
        res.redirect(404, "/");
      } else {
        console.log("LOOK AT HERE: WE ARE IN CATEGORY CONTROLLER SHOW METHOD");
        res.render("categories/show", {category});
      }
    });
  },

  destroy(req, res, next) {
    categoryQueries.deleteCategory(req.params.id, (err, category) => {
      if(err) {
        res.redirect(500, `categories/${category.id}`);
      } else {
        res.redirect(303, "/categories");
      }
    });
  },

  edit(req, res, next) {
    categoryQueries.getCategory(req.params.id, (err, category) => {
      if(err || !category) {
        res.redirect(404, "/categories");
      } else {
        res.render("categories/edit", {category});
      }
    });
  },

  update(req, res, next) {
    categoryQueries.updateCategory(req.params.id, req.body, (err, category) => {
      if(err || !category) {
        res.redirect(404, `/categories/${req.params.id}/edit`);
      } else {
        res.redirect(`/categories/${category.id}`);
      }
    });
  }
}
