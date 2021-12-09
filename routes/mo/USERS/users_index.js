"use strict";
const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../../../middle/certification/middlewares");
const router = express.Router();
const users = require("./users.ctrl");

//  모바일 버전 -------------------------------------------------------------------------------------

router.get("/dupCheck/:checkId", users.output.dupCheck);
router.get("/companyCheck/:checkId", users.output.companyCheck);

router.get("/home", users.output.MO_MN_MNP0001) // 모바일 메인
router.get("/login", users.output.LOGIN); // 로그인 화면
router.get("/signup", users.output.MO_CO_MEM0001); // 회원가입 화면
router.get("/signup/mail", users.output.MO_CO_MEM0002); // 이메일 인증
router.get("/forget", users.output.MO_CO_LIN0002); // 아이디, 비밀번호 찾기
router.get("/forget/login/fail", users.output.MO_CO_LIN0005); // 로그인 감지 페이지 (로그인 실패 중복)
router.get("/forget/login/fail/reset", users.output.MO_CO_LIN0006); // 로그인 감지 재설정 페이지
router.get("/forget/reset", users.output.MO_CO_LIN0007); // 비밀번호 재설정 페이지
router.get("/forget/reset/result", users.output.MO_CO_LIN0008); // 비밀번호 재설정 완료 페이지
router.post("/register", isNotLoggedIn, users.process.userRegister);
router.get("/auth/email", users.output.emailAuth, users.process.emailAuthChack);
router.post("/login", isNotLoggedIn, users.process.login, users.process.statusCheck); // 로그인


router.get("/signup/result/:id", users.output.MO_CO_MEM0003); // 회원가입 완료 //--------------------------
router.post("/signup/result/:id", users.process.signupReMail); // 회원가입 완료 //--------------------------

router.get("/auth/logout", isLoggedIn, users.output.logout); // 로그인 상황 -> 로그아웃
//  회원정보 분실 ------------------------------------------------------------------------------------

router.post("/find/id", users.process.idFind); // 아이디 찾기 mo.output.MO_CO_LIN0003
router.post("/find/pw", users.process.password); // 비밀번호 찾기
router.get("/auth/reset-password/:id/:token", users.output.MO_CO_LIN0007); //test2.process.resetPassword
router.post("/auth/reset-password/:id/:token", isNotLoggedIn, users.process.resetPassword);

module.exports = router;
