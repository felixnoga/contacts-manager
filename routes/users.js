const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post("/", userController.validatePostedUser, userController.insertUser);

module.exports = router;
