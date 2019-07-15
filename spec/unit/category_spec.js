const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Question = require("../../src/db/models").Question;

describe("Category", () => {

  beforeEach((done) => {

    this.category;
    this.question;

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
          done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });

    });
  });

  describe("#create()", () => {

     it("should create a category object with a title and description", (done) => {

       Category.create({
         title: "Family Law",
         description: "Family law is the area of law that negotiates various issues on domestic relations."
       })
       .then((category) => {
         expect(category.title).toBe("Family Law");
         expect(category.description).toBe("Family law is the area of law that negotiates various issues on domestic relations.");
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create a category with missing title and description", (done) => {
       Category.create({
         title: "House sale"
       })
       .then((category) => {
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Category.description cannot be null");
         done();
       });
     });

   });


  describe("#getQuestions", () => {

    it("should return the associated posts", (done) => {

      this.category.getQuestions()
      .then((associatedQuestions) => {
        expect(associatedQuestions[0].subject).toBe("House sale");
        expect(associatedQuestions[0].body).toBe("What options do I have when the co-owner has not paid his share of mortgage.");
        done();
      });
    });
  });

});
