const questionQueries = require("../db/queries.questions.js");
const categoryQueries = require("../db/queries.categories.js");

module.exports = {

  new(req, res, next) {
    res.render("questions/new", {categoryId: req.params.categoryId});
  },

  create(req, res, next) {

    let newQuestion = {
      subject: req.body.subject,
      body: req.body.body,
      categoryId: req.params.categoryId,
      userId: req.user.id
    };

    questionQueries.addQuestion(newQuestion, (err, question) => {
      if(err) {
        console.log("ERROR HAPPENED IN CREATE callback" + err);
        res.redirect(500, "/questions/new");
      } else {
        console.log("WE ARE IN QUESTION CONTROLLER CREATE");
        console.log(newQuestion);
        res.redirect(303, `/categories/${newQuestion.categoryId}`);
      }
    });
  },

  show(req, res, next) {

    questionQueries.getQuestion(req.params.id, (err, question) => {
      if(err || question == null) {
        console.log("THERE IS AN ERROR IN SHOW METHOD IN CONTROLLER");
        console.log(err);
        res.redirect(404, "/");
      } else {
        console.log("YOU NOW REDIRECTED TO QUESTION SHOW VIEW");
        res.render("questions/show", {question});
      }
    });
  },

  delete(req, res, next) {
    questionQueries.deleteQuestion(req, (err, question) => {
      if(err) {
        console.log("THERE IS AN ERROR IN DELETE CONTROLLER" + err);
        res.redirect(500, `/categories/${newQuestion.categoryId}/questions/${question.id}`);
      } else {
        console.log("IT SHOULD DELETE THE QUESTION CAUSE NO ERROR OCCURED in DELETE CONTROLLER");
        res.redirect(303, `/categories/${req.params.categoryId}`);
      }
    });
  },

  edit(req, res, next) {
    questionQueries.getQuestion(req.params.id, (err, question) => {

      if(err || question == null) {
        res.redirect(404, "/");
        console.log(err);
      } else {
        res.render("questions/edit", {question});
      }
    });
  },

  update(req, res, next) {
    questionQueries.updateQuestion(req, req.body, (err, question) => {
      if(err || question == null) {
        res.redirect(500, `/categories/${req.params.categoryId}/questions/${req.params.id}/edit`);
      } else {
        res.redirect(`/categories/${question.categoryId}`);
      }
    });
  }
}
