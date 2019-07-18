const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/categories", categoryController.index);

router.get("/categories/new", categoryController.new);

router.post("/categories/create", categoryController.create);

router.get("/categories/:id", categoryController.show);

router.post("/categories/:id/destroy", categoryController.destroy);

router.get("/categories/:id/edit", categoryController.edit);

router.post("/categories/:id/update", categoryController.update);

module.exports = router;
