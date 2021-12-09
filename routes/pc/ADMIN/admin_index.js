"use strict";
const express = require("express");
const router = express.Router();
const admin = require("./admin.ctrl");

router.get("/login", admin.output.login);
router.get("/adminlogin", admin.output.PC_CO_LIN0003); // 관리자 로그인

router.get("/testtest", admin.output.testtest);
router.get("/testtest2", admin.output.testtest2);
router.get("/authentication", admin.output.approvalid_fail); // 승인대기
router.get("/guideList", admin.output.guideList);
router.get("/guideDetail/:id", admin.output.guideDetail);
router.get("/storeList", admin.output.storeList);
router.get("/storeDetail/:id", admin.output.storeDetail);

router.post("/confirm_check/:id", admin.process.confirmCheck);

// confirm checking sample
router.get("/main", admin.output.BO_MAIN);
router.get("/sample", admin.output.BO_SAMPLE);
router.get("/list", admin.output.authList); // 리스트 노출
router.get("/confirm/:id", admin.output.confirm); // 승인
router.get("/return/:id", admin.output.return); // 반려
router.post("/checklist", admin.process.listCheck);

module.exports = router;
