const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Welcome to our platform: Ask A Lawyer");
});

module.exports = router;
