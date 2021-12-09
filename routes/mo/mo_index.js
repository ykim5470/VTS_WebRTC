"use strict";
const { isLoggedIn, isNotLoggedIn } = require("../../middle/certification/middlewares");

const express = require("express");
const router = express.Router();
const users_index = require("./USERS/users_index");
const guide_index = require("./GUIDE/guide_index");
const calls_index = require("./CALLS/calls_index");
const passport = require("passport");

router.use("/m", users_index);
router.use("/m", guide_index);
router.use("/call", calls_index);

// Mobile
router.get("/auth/kakao", passport.authenticate("kakao"));
router.get("/auth/kakao/callback", passport.authenticate("kakao", { failureRedirect: "/m/login" }), (req, res) => {
  res.redirect("/m/home");
});


module.exports = router;
