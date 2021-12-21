"use strict";
const express = require("express");
const router = express.Router();
const ctrl = require("./ctrl");
const fs = require('fs')

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

router.get("/g", ctrl.output.stream);
router.get("/u", ctrl.output.view);
router.get("/v", ctrl.output.layout);
router.get('/l', ctrl.output.list)
router.get('/u/rec', ctrl.output.recView)


 // ./public/all.js에서 post 된 payload 필요
router.post("/broadcast", ctrl.process.streamer);
router.post("/consumer", ctrl.process.viewer);

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

module.exports = router;
