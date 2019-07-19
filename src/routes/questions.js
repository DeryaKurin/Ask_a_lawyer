const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");


const questionController = require("../controllers/questionController");
const validation = require("./validation");

router.get("/categories/:categoryId/questions/new", questionController.new);

router.post("/categories/:categoryId/questions/create",
validation.validateQuestions,
helper.ensureAuthenticated, 
questionController.create);

router.get("/categories/:categoryId/questions/:id", questionController.show);

router.post("/categories/:categoryId/questions/:id/destroy", questionController.delete);

router.get("/categories/:categoryId/questions/:id/edit", questionController.edit);

router.post("/categories/:categoryId/questions/:id/update", validation.validateQuestions, questionController.update);

module.exports = router;
