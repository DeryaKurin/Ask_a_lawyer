const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

router.get("/categories/:categoryId/questions/new", questionController.new);

router.post("/categories/:categoryId/questions/create", questionController.create);

router.get("/categories/:categoryId/questions/:id", questionController.show);

router.post("/categories/:categoryId/questions/:id/destroy", questionController.delete);

router.get("/categories/:categoryId/questions/:id/edit", questionController.edit);

router.post("/categories/:categoryId/questions/:id/update", questionController.update);

module.exports = router;
