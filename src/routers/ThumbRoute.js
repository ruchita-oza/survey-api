const express = require("express");

const router = express.Router();
const { thumbnail } = require("../controllers/ThumbController");

router.post("/", thumbnail);

module.exports = router;
