"use strict";
const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../../../middle/certification/middlewares");
const common = require("./common.ctrl");

// 메인
router.get("/", common.output.main);
router.get("/main", common.output.main);

// 소개
router.get("/intro/guide", common.output.PC_CO_KWP0001); // 가이드 소개
router.get("/intro/trip", common.output.PC_CO_KWP0002); // 추천투어 소개
router.get("/GuideSubscribe", common.output.PC_CO_CON0001); // 가이드 가입안내 페이지
router.get("/StoreSubscribe", common.output.PC_CO_CON0002); // 판매점 입점안내 페이지

// ------------------------------------------------------------------------------------------

// 회원가입 완료
router.get("/signup/partner", common.output.PC_CO_MEM0001); // 파트너 회원가입
router.get("/signup/result/:id", common.output.PC_CO_MEM0005); // 회원가입 완료
router.post("/signup/result/:id", common.process.signupReMail); // 회원가입 완료
// + 로그인 후 인증이 안되어 있을 때 메일을 보낼 수 있는 페이지는 별도로 구성? 아니면 퍼블에서 처리할지 확인 필요

// 인증 문제
// router.get("/login/fail", common.output.PC_CO_LIN0009); // 로그인 감지 페이지
// router.get("/login/fail/reset", common.output.PC_CO_LIN0010); // 로그인 감지 재설정 페이지

// ------------------------------------------------------------------------------------------

// 정보 찾기
router.get("/forget", common.output.PC_CO_LIN0004); // 아이디, 비밀번호 찾기

router.post("/auth/find/id", common.process.idFind); // 아이디 찾기 완료
router.get("/forget/id/result", common.output.PC_CO_LIN0005); // 아이디 찾기 완료 페이지

router.post("/auth/find/pw", common.process.password); // 비밀번호 찾기 완료
router.get("/forget/pw/result", common.output.PC_CO_LIN0006); // 비밀번호 찾기 완료 페이지

router.get("/forget/reset", common.output.PC_CO_LIN0007); // 비밀번호 재설정 페이지
router.get("/forget/reset/result", common.output.PC_CO_LIN0008); // 비밀번호 재설정 완료 페이지

router.post("/auth/reset-password/:id/:token", common.process.resetPassword); // 비밀번호 변경
router.get("/auth/email", common.output.emailAuth, common.process.emailAuthChack); // 이메일 인증

// ------------------------------------------------------------------------------------------

// 약관안내 페이지
router.get("/TermsOfService", common.output.PC_CO_TER0001); // 이용약관
router.get("/PrivacyPolicy", common.output.PC_CO_TER0002); // 개인정보처리방침 약관
router.get("/TermsOfLocation", common.output.PC_CO_TER0003); // 위치정보이용약관

// ------------------------------------------------------------------------------------------

// 세션 종료
router.get("/auth/logout", isLoggedIn, common.output.logout); // 로그아웃

// ------------------------------------------------------------------------------------------

module.exports = router;
