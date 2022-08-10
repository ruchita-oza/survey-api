const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = User;