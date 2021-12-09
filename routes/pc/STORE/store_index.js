"use strict";
const express = require("express");
const router = express.Router();

const store = require("./store.ctrl");
const multerEd = require('../../../middle/multer/multer_editor');
const { isLoggedIn, isNotLoggedIn } = require("../../../middle/certification/middlewares");

router.get("/signup", store.output.PC_CO_MEM0003); // 판매점 회원가입
router.get("/signup/bsnsrc", store.output.company); // 사업자 검색 페이지
router.get("/signup/bsnsrc/search", store.output.companySearch); // 사업자 검색 결과
router.post("/register/admin", store.process.storeAdminRegister, store.process.storeAdminEmail); // 판매점 대표 회원가입 완료
router.post("/register", store.process.storeEmployeeRegister, store.process.storeEmployeeEmail); // 판매점 직원 회원가입 완료
router.get("/login", store.output.PC_CO_LIN0002); // 판매점 로그인
router.post("/auth/store-login", isNotLoggedIn, store.process.storelogin,); // 판매점 로그인 완료 -  store.process.statusCheck

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// board crud + editor sample

router.get('/', store.output.products_list);
router.get('/products', store.output.products_list);
router.get('/products/detail/:id', store.output.products_detail); 
router.get('/products/write', store.output.write);
router.get('/products/edit/:id', store.output.edit);
router.get('/products/delete/:id', store.output.delete);
router.get('/products/delete/:product_id/:memo_id', store.output.delete_memo);

router.post('/products/write', multerEd.single('image'), store.process.post_write);
router.post('/products/edit/:id', multerEd.single('image'), store.process.post_edit);
router.post('/products/detail/:id', store.process.post_delete); 
router.post('/products/ajax_summernote', multerEd.single('image'), store.process.post_summernote);
router.get("/products/confirm/:id", store.output.confirm); // 승인
router.get("/products/return/:id", store.output.return); // 반려

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

module.exports = router;
