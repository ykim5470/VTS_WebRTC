"use strict";
const express = require("express");
const router = express.Router();
const guide = require("./guide.ctrl");
const multerReg = require('../../../middle/multer/multer_register');
const { isLoggedIn, isNotLoggedIn } = require("../../../middle/certification/middlewares");

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

router.get("/signup", guide.output.PC_CO_MEM0002); // 가이드 회원가입
router.post("/Register", multerReg.single('image'), guide.process.guideRegister); // 가이드 회원가입
router.get("/login", guide.output.PC_CO_LIN0001); // 가이드 로그인
router.post("/guide-login", guide.process.guidelogin, guide.process.statusCheck); // 가이드 로그인 완료 - guide.process.statusCheck // isNotLoggedIn, 

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

module.exports = router;
