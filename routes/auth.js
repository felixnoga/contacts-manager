const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");
//@route    GET api/auth
//@desc     Get logged in user
//@access   Private

router.get("/", authMiddleware, authController.getAuthorizedUser);

//@route    POST api/auth
//@desc     Log in a user & get token
//@access   Public
router.post("/", authController.validateLoginUser, authController.loginUser);

module.exports = router;
