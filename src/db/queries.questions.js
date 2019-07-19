const Category = require("./models").Category;
const Question = require("./models").Question;
const User = require("./models").User;

module.exports = {
  addQuestion(newQuestion, callback){
    console.log("WE HAVE ENTERED THE QUESTION QUERY");
    return Question.create(newQuestion)
    .then((question) => {
      console.log("WE CREATED A QUESTION IN QUERIES");
      callback(null, question);
    })
    .catch((err) => {
      console.log("ERROR IN QUERIES CREATE");
      callback(err);
    })
  },

  getQuestion(id, callback) {
    return Question.findById(id)
    .then((question) => {
      
      callback(null, question);
    })
    .catch((err) => {
      callback(err);
    });
  },

  deleteQuestion(req, callback) {
    return Question.findById(req.params.id)
    .then((question) => {
      question.destroy()
      .then((res) => {
        callback(null, question);
      })
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateQuestion(req, updatedQuestion, callback) {
    return Question.findById(req.params.id)
    .then((question) => {
      if(!question) {
        return callback("Question not found");
      }

      question.update(updatedQuestion, {
        fields: Object.keys(updatedQuestion)
      })
      .then(() => {
        callback(null, question);
      })
    })
    .catch((err) => {
      callback(err);
    });
  }
}
