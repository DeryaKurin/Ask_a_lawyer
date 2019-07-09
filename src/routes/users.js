const express = require("express");
const router = express.Router();
const validation = require('./validation');
const userController = require("../controllers/userController");


router.get("/users/sign_up", userController.signUp);
router.get("/users/sign_up_enquirer", userController.signUpEnquirer);
router.get("/users/sign_up_advisor", userController.signUpAdvisor);
router.post("/users", validation.validateUsers, userController.createEnquirer);
router.post("/users", validation.validateUsers, userController.createAdvisor);

module.exports = router;
