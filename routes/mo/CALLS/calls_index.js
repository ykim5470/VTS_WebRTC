"use strict";
const express = require("express");
const router = express.Router();
const calls = require("./calls.ctrl");

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

router.get("/g", calls.output.stream);
router.get("/u", calls.output.view);
router.get("/v", calls.output.layout);
router.get('/l', calls.output.list)
router.get('/u/rec', calls.output.recView)
router.get('/u/l', calls.output.userList)

 // ./public/all.js에서 post 된 payload 필요
router.post("/broadcast", calls.process.streamer);
router.post("/consumer", calls.process.viewer);
router.post('/l/activeOn', calls.process.recUploads)

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

module.exports = router;
