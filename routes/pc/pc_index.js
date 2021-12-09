"use strict";
const { isLoggedIn, isNotLoggedIn } = require("../../middle/certification/middlewares");
const common_index = require("./_COMMON/common_index");
const store_index = require("./STORE/store_index");
const guide_index = require("./GUIDE/guide_index");
const admin_index = require("./ADMIN/admin_index");

const express = require("express");
const router = express.Router();


router.use("/", common_index);
router.use("/guide", guide_index);
router.use("/store", store_index);
router.use("/admin", admin_index);

module.exports = router;