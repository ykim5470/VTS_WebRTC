"use strict";
const express = require("express");
const router = express.Router();
const calls = require("./calls.ctrl");
const {
  isLoggedIn,
  isStatusCheck,
  isLoggedInGuide,
  isConfirmCheck,
  diviceCheck,
} = require("../../../middle/certification/middlewares");
const multerLiveThumb = require("../../../middle/multer/multer_live_thumbnail");
const all = require("../../pc/GUIDE/guide.ctrl");

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const guideCheck = (isLoggedIn, isStatusCheck, isLoggedInGuide, isConfirmCheck);

router.get("/g", calls.output.stream);
router.get("/u", calls.output.view);
router.get("/v", calls.output.layout);
router.get("/l", calls.output.list);
router.get("/u/rec", calls.output.recView);
router.get("/u/l", calls.output.userList);

// ./public/all.js에서 post 된 payload 필요
router.post("/broadcast", calls.process.streamer);
router.post("/consumer", calls.process.viewer);
router.post("/l/activeOn", calls.process.recUploads);
router.post(
  "/l/liveStreamSetup",
  multerLiveThumb.single("thumbNailImg"),
 calls.process.liveStreamSetup,

);


router.delete('/rec/delete/:id', calls.process.recMediaDelete)

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

module.exports = router;
