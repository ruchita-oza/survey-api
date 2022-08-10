const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Sequelize = require("sequelize");

class Question extends Model {}

Question.init(
  {
    question: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    answer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    survey_id: { type: DataTypes.STRING(50), allowNull: false },
  },
  {
    sequelize,
    modelName: "question",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Question;
