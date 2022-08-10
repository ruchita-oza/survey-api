const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");

class Survey extends Model {}

Survey.init(
  {
    survey_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "survey",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Survey;
