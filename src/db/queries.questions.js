const Category = require("./models").Category;
const Question = require("./models").Question;

module.exports = {
  addQuestion(newQuestion, callback){
    return Question.create(newQuestion)
    .then((question) => {
      callback(null, question);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getQuestion(id, callback) {
    return Question.findById(id)
    .then((question) => {
      console.log(question);
      console.log("WE ARE IN GET QUESTION QUERIES");
      callback(null, question);
    })
    .catch((err) => {
      console.log("THERE IS AN ERROR IN QUERIES GET QUESTION");
      callback(err);
    });
  },

  deleteQuestion(req, callback) {
    return Question.findById(req.params.id)
    .then((question) => {
      question.destroy()
      .then((res) => {
        callback(null, question);
        console.log("WE ARE IN QUERIES DELETE QUESTION RESPONSE");
      })
    })
    .catch((err) => {
      console.log("ERROR IN QUERIES DELETE QUESTION");
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
