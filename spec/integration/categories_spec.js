const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/categories/";
const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const User = require("../../src/db/models").User;

describe("routes : categories", () => {

  beforeEach((done) => {
    this.category;
    sequelize.sync({force: true}).then((res) => {
      Category.create({
        title: "Property Law",
        description: "Property law is the area of law that governs the various forms of ownership and tenancy in real property (land as distinct from personal or movable possessions) and in personal property, within the common law legal system."
      })
      .then((category) => {
        this.category = category;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /categories", () => {

    it("should return a status code 200 and all categories", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Categories");
        expect(body).toContain("Property Law");
        done();
      });
    });

  });

  describe("GET /categories/new", () => {

    it("should render a new category form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Category");
        done();
      });
    });

  });

  describe("POST /categories/create", () => {

    const options = {
      url: `${base}create`,
      form: {
        title: "Property Law",
        description: "Property law is the area of law that governs the various forms of ownership and tenancy in real property (land as distinct from personal or movable possessions) and in personal property, within the common law legal system."
      }
    };

    it("should create a new category and redirect", (done) => {
      request.post(options, (err, res, body) => {
        Category.findOne({ where: {
          title: "Property Law"
        }})
        .then((category) => {
          expect(res.statusCode).toBe(303);
          expect(category.title).toBe("Property Law");
          expect(category.description).toBe("Property law is the area of law that governs the various forms of ownership and tenancy in real property (land as distinct from personal or movable possessions) and in personal property, within the common law legal system.");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /categories/:id", () => {
    it("should render a view of the selected category", (done) => {
      request.get(`${base}${this.category.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Property Law");
        done();
      });
    });
  });

  describe("POST /categories/:id/destroy", () => {
    it("should delete the category with the associated ID", (done) => {
      Category.all()
      .then((categories) => {
        const categoryCountBeforeDelete = categories.length;

        expect(categoryCountBeforeDelete).toBe(1);

        request.post(`${base}${this.category.id}/destroy`, (err, res, body) => {
          Category.all()
          .then((categories) => {
            expect(err).toBeNull();
            expect(categories.length).toBe(categoryCountBeforeDelete -1);
            done();
          })
        });
      });
    });
  });

  describe("GET /categories/:id/edit", () => {
    it("should render a view with the category edit form", (done) => {
      request.get(`${base}${this.category.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Category");
        expect(body).toContain("Property Law");
        done();
      });
    });
  });

  describe("POST /categories/:id/update", () => {
    it("should update the category with the given values", (done) => {
      const options = {
        url: `${base}${this.category.id}/update`,
        form: {
          title: "Family Law",
          description: "We take care of all kinds of divorce cases"
        }
      };

      request.post(options, (err, res, body) => {

        expect(err).toBeNull();

        Category.findOne({
          where: {
            id: this.category.id
          }
        })
        .then((category) => {
          expect(category.title).toBe("Family Law");
          done();
        });        
      });
    });
  });

});
