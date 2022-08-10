const Survey = require("../models/SurveyModel");
const Question = require("../models/QuestionModel");
async function checkExists(survey_id) {
  const survey = await Survey.findAll({
    where: { id: survey_id },
  });
  return survey.length > 0 ? true : false;
}

const createSurvey =  async (req, res, next) => {
  try {
    console.log(req.body.que[0]);
    const newSurvey = await Survey.create({
      survey_name: req.body.survey_name,
    });
    await newSurvey.save();
    let que;
    for (var key in req.body.que) {
      que = await Question.create({
        question: req.body.que[key].q,
        answer: req.body.que[key].a,
        survey_id: newSurvey.id,
      });
      await que.save();
    }
    res
      .status(200)
      .json({ data: "Survey created successfully", success: true });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

// to give all survey que by given survey id
const takeSurveyById = async (req, res, next) => {
  try {
    const surveyId = req.params.id;
    const status = await checkExists(surveyId);
    if (!status) return next(createError(422, "Survey does not exits"));
    const questions = await Question.findAll({
      where: { survey_id: surveyId },
    });
    const survey = await Survey.findOne({ where: { id: surveyId } });
    // console.log(questions);
    // console.log(survey);
    res
      .status(200)
      .json({ success: true, survey_name: survey.survey_name, questions });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

//give result
const surveyResult = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log();
    const surveyId = req.params.id;
    const status = await checkExists(surveyId);
    if (!status) return next(createError(422, "Survey does not exits"));
    const question = await Question.findAll({ where: { survey_id: surveyId } });
    if (!question)
      return next(createError(422, "Question not found for this survey"));
    if (question.length != req.body.userRes.length)
      return next(createError(422, "Please provide all answer"));
    var result = 0;
    for (var key in question) {
      if (question[key].answer == req.body.userRes[key]) result++;
    }
    res.status(200).json(`you got ${result} out of ${question.length}`);
  } catch (err) {
    next(err);
  }
};
module.exports = { createSurvey, takeSurveyById, surveyResult };
