const express = require("express");

const router = express.Router();
const {
  createSurvey,
  takeSurveyById,
  surveyResult,
} = require("../controllers/SurveyController");
const { verifyToken } = require("../utils/verifyToken");

router.post("/", verifyToken, createSurvey);
router.get("/:id", verifyToken, takeSurveyById);
router.post("/:id", verifyToken, surveyResult);

module.exports = router;
