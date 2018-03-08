const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
  res.render("home",{
    name: "lishu",
    id: 2
  });
});

module.exports = router;