const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get("/", function(req,res) {
  res.render("contribuidores.ejs", {
  })
})

module.exports = router;