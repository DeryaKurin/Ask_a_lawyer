const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Question = require("../../src/db/models").Question;
const User = require("../../src/db/models").User;

describe("Category", () => {

  beforeEach((done) => {
       this.category;
       this.question;
       this.user;

       sequelize.sync({force: true}).then((res) => {


         User.create({
           name: "Ahmet Mahmut",
           email: "ahmetmahmut@gmail.com",
           phone: "3423871",
           password: "123456789",
           role: 0
         })
         .then((user) => {
           this.user = user; //store the user


           Category.create({
             title: "Property Law",
             description: "Property law is the area of law that governs the various forms of ownership and tenancy in real property.",


             questions: [{
               subject:"House sale",
               body: "What options do I have when the co-owner has not paid his share of mortgage.",
               userId: this.user.id
             }]
           }, {

             include: {
               model: Question,
               as: "questions"
             }
           })
           .then((category) => {
             this.category = category; //store the topic
             this.question = category.questions[0]; //store the post
             done();
           })
         })
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

    it("should return the associated questions", (done) => {

      this.category.getQuestions()
      .then((associatedQuestions) => {
        expect(associatedQuestions[0].subject).toBe("House sale");
        expect(associatedQuestions[0].body).toBe("What options do I have when the co-owner has not paid his share of mortgage.");
        done();
      });
    });
  });

});
