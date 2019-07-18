const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/categories/";
const sequelize = require("../../src/db/models/index").sequelize;

const Category = require("../../src/db/models").Category;
const Question = require("../../src/db/models").Question;

describe("routes : questions", () => {

  beforeEach((done) => {
    this.category;
    this.question;

    sequelize.sync({force: true}).then((res) => {

      Category.create({
        title: "Property Law",
        description: "Property law is the area of law that governs the various forms of ownership and tenancy in real property (land as distinct from personal or movable possessions) and in personal property, within the common law legal system."
      })
      .then((category) => {
        this.category = category;

        Question.create({
          subject:"Company sale",
          body: "What options do I have when the co-owner has not paid his share of company.",
          categoryId: this.category.id
        })
        .then((question) => {
          this.question = question;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
     });
    });
  });

  describe("GET /categories/:categoryId/questions/new", () => {

    it("should render a new question form",  (done) => {

      request.get(`${base}${this.category.id}/questions/new`, (err, re, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Question");
        done();
      });

    });
  });



// });

  describe("POST /categories/:categoryId/questions/create", () => {

    it("should create a new question and redirect", (done) => {

      const options = {
        url: `${base}${this.category.id}/questions/create`,
        form: {
          subject: "House Sale",
          body: "What options do I have when the co-owner has paid his share of company.",
          categoryId: this.category.id
        }
      };

      request.post(options, (err, res, body) => {
        Question.findOne({ where: { subject: "House Sale"}})
        .then((question) => {
          expect(question).not.toBeNull();
          expect(question.body).toBe("What options do I have when the co-owner has paid his share of company.");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

    });
  });
  //
  //   it("should not create a new question that fails validation", (done) => {
  //     url: `${base}${this.category.id}/questions/create`,
  //     form: {
  //       subject: "a",
  //       body: "b"
  //     }
  //   };
  //
  //   request.post(options, (err, res, body) => {
  //
  //     Question.findOne({ where: { subject: "a"}})
  //     .then((question) => {
  //       expect(question).toBeNull();
  //       done();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       done();
  //     });
  //   });
  // });
  //
  describe("GET /categories/:categoryId/questions/:id", () => {

    it("should render a view with the selected question", (done) => {

      request.get(`${base}${this.category.id}/questions/${this.question.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(this.question.subject).toContain("Company sale");
        done();
      });

    });
  });
  //
  describe("POST /categories/:categoryId/questions/:id/destroy", () => {

     it("should delete the question with the associated ID", (done) => {
       expect(this.question.id).toBe(1);

       request.post(`${base}${this.category.id}/questions/${this.question.id}/destroy`, (err, res, body) => {
         Question.findById(1)
         .then((question) => {
           expect(err).toBeNull();
           expect(question).toBeNull();
           done();
         })
       });
     });
   });
  //
   describe("GET /categories/:categoryId/questions/:id/edit", () => {

      it("should render a view with an edit question form", (done) => {
        request.get(`${base}${this.category.id}/questions/${this.question.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Question");
          expect(this.question.subject).toContain("Company sale");
          done();
        });
      });
    });
  //
  describe("POST /categories/:categoryId/questions/:id/update", () => {

    it("should return a status code 302", (done) => {
       request.post({
         url: `${base}${this.category.id}/questions/${this.question.id}/update`,
         form: {
           subject: "Apartment Sale",
           body: "What options do I have when the co-owner has not paid her share of company."
         }
       }, (err, res, body) => {

         expect(res.statusCode).toBe(302);
         done();
       });
     });

     it("should update the question with the given values", (done) => {
         const options = {
           url: `${base}${this.category.id}/questions/${this.question.id}/update`,
           form: {
             subject: "Apartment Sale",
             body: "What options do I have when the co-owner has not paid her share of company."
           }
         };
         request.post(options,
           (err, res, body) => {
           expect(err).toBeNull();
           Question.findOne({
             where: {id: this.question.id}
           })
           .then((question) => {
             expect(question.subject).toBe("Apartment Sale");
             done();
           });
         });
       });

    });
  });
