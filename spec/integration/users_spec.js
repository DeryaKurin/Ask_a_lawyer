const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;


describe("routes: users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("GET /users/sign_up", () => {

    it("should render a sign up view with two options", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up to ask questions");
        done();
      });
    });

  });

  describe("GET /users/sign_up_enquirer", () => {

    it("should render an enquirer sign up form", (done) => {
      request.get(`${base}sign_up_enquirer`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up to be an Enquirer");
        done();
      });
    });

  });

  describe("GET /users/sign_up_advisor", () => {

    it("should render an enquirer sign up form", (done) => {
      request.get(`${base}sign_up_advisor`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up to be a Legal Advisor");
        done();
      });
    });

  });

  describe("POST /users", () => {
    it("should create a user with the valid values and redirect",  (done) => {

      const options = {
        url: base,
        form: {
          name: "Ahmet Mahmut Unlu",
          email: "ahmetmahmut@gmail.com",
          phone: "3423871",
          password: "123456789"
        }
      }

      request.post(options, (err, res, body) => {

        User.findOne({where: {email: "ahmetmahmut@gmail.com"}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.email).toBe("ahmetmahmut@gmail.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "no" }})
          .then((user) => {
            expect(user).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
    
  });
});
