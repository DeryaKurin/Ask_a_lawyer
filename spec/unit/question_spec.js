const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Question = require("../../src/db/models").Question;
const User = require("../../src/db/models").User;

describe("Question", () => {

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
        this.user = user;

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

     it("should create a question object with a subject, body and assigned category and user", (done) => {

       Question.create({
         subject:"House sale",
         body: "1. Not having to answer the 'are we there yet?' question.",
         categoryId: this.category.id,
         userId: this.user.id
       })
       .then((question) => {
         expect(question.subject).toBe("House sale");
         expect(question.body).toBe("1. Not having to answer the 'are we there yet?' question.");
         expect(question.categoryId).toBe(this.category.id);
         expect(question.userId).toBe(this.user.id);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create a question with missing subject, body, or assigned category", (done) => {
       Question.create({
         subject: "House sale"
       })
       .then((question) => {
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Question.body cannot be null");
         expect(err.message).toContain("Question.categoryId cannot be null");
         done();
       });
     });

   });
  //
  describe("#setCategory()", () => {

    it("should associate a question with a category", (done) => {

      Category.create({
        title: "Family Law",
        description: "We love to divorce couples!"
      })
      .then((newCategory) => {

        expect(this.question.categoryId).toBe(this.category.id);

        this.question.setCategory(newCategory)
        .then((question) => {
          expect(question.categoryId).toBe(newCategory.id);
          done();
        });
      })
    });
  });

  describe("#getCategory", () => {

    it("should return the associated category", (done) => {

      this.question.getCategory()
      .then((associatedCategory) => {
        expect(this.question.categoryId).toBe(associatedCategory.id);
        done();
      });
    });
  });

  describe("#setUser()", () => {

     it("should associate a question and a user together", (done) => {

       User.create({
         name: "Ahmet Mahmut",
         email: "ahmetmahmut@gmail.com",
         phone: "3423871",
         password: "123456789",
         role: 0
       })
       .then((newUser) => {

         expect(this.question.userId).toBe(this.user.id);

         this.question.setUser(newUser)
         .then((question) => {

           expect(this.question.userId).toBe(newUser.id);
           done();

         });
       })
     });

   });

   describe("#getUser()", () => {

     it("should return the associated category", (done) => {

       this.question.getUser()
       .then((associatedUser) => {
         expect(associatedUser.email).toBe("ahmetmahmut@gmail.com");
         done();
       });

     });

   });

});
