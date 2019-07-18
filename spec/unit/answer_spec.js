const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Question = require("../../src/db/models").Question;
const Answer = require("../../src/db/models").Answer;
const User = require("../../src/db/models").User;

describe("Answer", () => {
  beforeEach((done) => {
    this.category;
    this.question;
    this.answer;

    sequelize.sync({force: true}).then((res) => {

      Category.create({
        title: "Property Law",
        description: "Property law is the area of law that governs the various forms of ownership and tenancy in real property."
      })
      .then((category) => {
        this.category = category;

        Question.create({
          subject:"House sale",
          body: "What options do I have when the co-owner has not paid his share of mortgage.",
          categoryId: this.category.id
        })
        .then((question) => {
          this.question = question;

          Answer.create({
            body: "You may give me full right to take this case!",
            questionId: this.question.id
          })
          .then((answer) => {
            this.answer = answer;
          })
          .catch((err) => {
            console.log(err);
            done();
          })
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });



});
